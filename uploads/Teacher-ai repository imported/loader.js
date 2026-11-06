// In-browser module loader for the Teacher-ai Vite/React app.
// Transpiles JSX with @babel/standalone and resolves the local ./src module
// graph into blob-URL ES modules. Bare npm specifiers (react, three, …) are
// left untouched and resolved by the document <script type="importmap">.
//
// Speed: the module graph is built in PARALLEL (Promise.all over each file's
// imports), each file is Babel-transpiled ONCE (imports are discovered with a
// cheap regex up front, not a second Babel pass), and every source file is
// fetched at most once (shared text cache). A rare second pass only runs if the
// regex missed a specifier, keeping correctness while the common path stays 1×.

const B = window.Babel;
const REACT_PRESET = ['react', { runtime: 'automatic' }];

const buildCache = new Map(); // url -> Promise<blobUrl>
const textCache = new Map();  // url -> Promise<string>

function fetchText(url) {
  if (textCache.has(url)) return textCache.get(url);
  const p = fetch(url).then((r) => (r.ok ? r.text() : Promise.reject(new Error('fetch ' + r.status + ' ' + url))));
  textCache.set(url, p);
  return p;
}

// Cheap import discovery — good enough for our standard import syntax.
function discover(src) {
  const specs = new Set();
  const patterns = [
    /(?:^|[^.\w$])(?:import|export)\b[^;{]*?\bfrom\s*['"]([^'"]+)['"]/g, // import/export ... from '…'
    /(?:^|[^.\w$])import\s*['"]([^'"]+)['"]/g,                            // side-effect import '…'
    /\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g,                             // dynamic import('…')
  ];
  for (const re of patterns) { let m; while ((m = re.exec(src))) specs.add(m[1]); }
  return specs;
}

// Rewrite local specifiers to their built blob URLs; drop CSS side-effects.
// Any relative specifier missing from `map` is recorded in `missed` and left
// untouched so a follow-up pass can resolve it.
function rewritePlugin(map, missed) {
  const handle = (node, remove) => {
    const s = node.source;
    if (!s) return;
    const v = s.value;
    if (v in map) { if (map[v] === null) remove(); else s.value = map[v]; }
    else if (v[0] === '.') missed.add(v);
  };
  return function () {
    return {
      visitor: {
        'ImportDeclaration|ExportNamedDeclaration|ExportAllDeclaration'(path) {
          handle(path.node, () => path.remove());
        },
        Import(path) {
          const arg = path.parentPath.node.arguments && path.parentPath.node.arguments[0];
          if (!arg || arg.type !== 'StringLiteral') return;
          if (arg.value in map && map[arg.value]) arg.value = map[arg.value];
          else if (arg.value[0] === '.') missed.add(arg.value);
        },
      },
    };
  };
}

async function resolveSpec(spec, importer) {
  const abs = new URL(spec, importer).href;
  if (/\.(jsx?|mjs)$/.test(abs)) return abs;
  for (const e of ['.jsx', '.js', '/index.jsx', '/index.js']) {
    try { await fetchText(abs + e); return abs + e; } catch { /* try next */ }
  }
  return abs + '.js';
}

function build(url) {
  if (buildCache.has(url)) return buildCache.get(url);
  const p = _build(url);
  buildCache.set(url, p);
  return p;
}

async function resolveMap(specs, url, map) {
  await Promise.all([...specs].map(async (spec) => {
    if (spec in map) return;
    if (spec.endsWith('.css')) { map[spec] = null; return; }
    if (spec[0] === '.') { map[spec] = await build(await resolveSpec(spec, url)); }
  }));
}

async function _build(url) {
  const raw = await fetchText(url);
  const pre = raw.split('import.meta.env').join('(window.__VITE_ENV__||{})');

  // Discover + build children in parallel, then transpile ONCE.
  const map = {};
  await resolveMap(discover(pre), url, map);

  const missed = new Set();
  let code = B.transform(pre, { filename: url, presets: [REACT_PRESET], plugins: [rewritePlugin(map, missed)] }).code;

  // Rare fallback: regex missed a real import — resolve those and re-transpile.
  if (missed.size) {
    await resolveMap(missed, url, map);
    code = B.transform(pre, { filename: url, presets: [REACT_PRESET], plugins: [rewritePlugin(map, new Set())] }).code;
  }

  return URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
}

(async () => {
  try {
    // Ensure <model-viewer> is upgraded before React mounts, so React sets the
    // real `src` accessor rather than shadowing it on an un-upgraded node.
    // Don't block the whole boot on it — transpile the graph in parallel.
    const mvReady = Promise.race([
      customElements.whenDefined('model-viewer'),
      new Promise((r) => setTimeout(r, 8000)),
    ]);

    const entryPromise = build(new URL('./src/main.jsx', location.href).href);
    const [entry] = await Promise.all([entryPromise, mvReady]);
    await import(entry);
  } catch (err) {
    console.error('[preview loader]', err);
    const root = document.getElementById('root');
    if (root) {
      root.innerHTML =
        '<div style="font:15px/1.6 system-ui;max-width:640px;margin:12vh auto;padding:24px;color:#b4232a">' +
        '<b>Preview failed to boot.</b><br>' + String(err && err.message || err) +
        '<br><br><span style="color:#555">See console for details.</span></div>';
    }
  }
})();
