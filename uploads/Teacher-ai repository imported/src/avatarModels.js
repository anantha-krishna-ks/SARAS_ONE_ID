// Hosted 3D avatar models.
//
// The original app loaded these from local files in public/ (/brunette.glb,
// /avaturn.glb, /mpfb.glb, /avatarsdk.glb) — but those .glb binaries were never
// committed to the GitHub repo, so they 404 here. The app was built from the
// met4citizen/TalkingHead sample avatars (same filenames), so we serve them
// from raw.githubusercontent: RPM-rigged (works with TalkingHead's lip-sync),
// CORS-open, and no CDN size cap (mpfb.glb exceeds jsDelivr's limit) — so they
// render in this preview and locally alike.
//
// The keys keep the original "/x.glb" ids unchanged so gender detection
// (selectedAvatar === '/avatarsdk.glb') elsewhere in the app keeps working.
// To use your own models, drop the .glb files at the project root and set each
// value back to its "/x.glb" path.

const gh = (file) =>
  `https://raw.githubusercontent.com/met4citizen/TalkingHead/main/avatars/${file}`;

export const AVATAR_MODELS = {
  '/brunette.glb':  gh('brunette.glb'),
  '/avaturn.glb':   gh('avaturn.glb'),
  '/mpfb.glb':      gh('mpfb.glb'),
  '/avatarsdk.glb': gh('avatarsdk.glb'),
};

// Resolve an avatar id to a loadable model URL (falls back to the id itself).
export function avatarModelUrl(id) {
  return AVATAR_MODELS[id] || id;
}
