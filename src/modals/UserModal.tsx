import React, { useState } from 'react'
import { Modal, ModalFooter, Section, Field, Dropdown, useForm, ErrBanner, EMAIL_RE, S, Icon } from '../ui'
import { roles, orgTree } from '../data'

function OrgUnitNode({ node, depth, value, onSelect, expanded, setExpanded }) {
  const kids = node.children || []
  const open = !!expanded[node.code]
  const sel = value === node.name
  return (
    <div>
      <div data-ix="row" role="treeitem" aria-selected={sel} aria-expanded={kids.length ? open : undefined} onClick={() => onSelect(node.name)}
        style={{ display:'flex', alignItems:'center', gap:8, padding:'7px 10px', paddingLeft:10 + depth * 22, borderRadius:8, cursor:'pointer', background: sel ? 'var(--primary-tint)' : 'transparent' }}>
        {kids.length > 0
          ? <button type="button" aria-label={(open ? 'Collapse ' : 'Expand ') + node.name} onClick={(e) => { e.stopPropagation(); setExpanded(x => ({ ...x, [node.code]: !open })) }}
              style={{ flex:'none', width:20, height:20, display:'flex', alignItems:'center', justifyContent:'center', border:'none', background:'transparent', color:'var(--muted)', cursor:'pointer', padding:0 }}>
              <Icon d="M9 18l6-6-6-6" size={12} style={{ transform: open ? 'rotate(90deg)' : 'none', transition:'transform .15s ease' }} />
            </button>
          : <span aria-hidden style={{ width:20, flex:'none' }} />}
        <span aria-hidden style={{ display:'flex', alignItems:'center', justifyContent:'center', width:24, height:24, borderRadius:6, flex:'none', background: sel ? 'var(--primary)' : 'var(--primary-tint)', color: sel ? '#fff' : 'var(--primary)' }}><Icon d={node.icon} size={12} /></span>
        <span style={{ fontSize:13.2, fontWeight: sel ? 600 : 500, color:'var(--ink)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{node.name}</span>
        <span style={{ fontSize:11, color:'var(--muted)', flex:'none' }}>{node.type}</span>
        {sel && <span style={{ marginLeft:'auto', flex:'none', color:'var(--primary)', display:'flex' }}><Icon d="M20 6L9 17l-5-5" size={13} sw={2.5} /></span>}
      </div>
      {open && kids.map(k => <OrgUnitNode key={k.code} node={k} depth={depth + 1} value={value} onSelect={onSelect} expanded={expanded} setExpanded={setExpanded} />)}
    </div>
  )
}

function OrgUnitTree({ value, onSelect, expanded, setExpanded }) {
  return (
    <div>
      <div role="tree" aria-label="Organization structure" style={{ border:'1px solid var(--border)', borderRadius:10, background:'var(--surface)', padding:6, maxHeight:236, overflowY:'auto' }}>
        {orgTree.map(n => <OrgUnitNode key={n.code} node={n} depth={0} value={value} onSelect={onSelect} expanded={expanded} setExpanded={setExpanded} />)}
      </div>
      <div style={{ marginTop:7, fontSize:12.2, color:'var(--muted)' }}>{value ? <>Selected: <strong style={{ color:'var(--ink)', fontWeight:600 }}>{value}</strong></> : 'Select the organization unit this account belongs to.'}</div>
    </div>
  )
}

export function UserModal({ onClose, stop, ddProps, ddVal, toast, record }) {
  const edit = !!record
  const [photo, setPhoto] = useState(record?.photo || null)
  const [orgExpanded, setOrgExpanded] = useState({ 'EXA-ROOT': true })
  const onPhoto = (e) => { const file = e.target.files && e.target.files[0]; if (!file) return; const r = new FileReader(); r.onload = () => setPhoto(r.result); r.readAsDataURL(file); e.target.value = '' }
  const nameParts = (record?.name || '').trim().split(/\s+/).filter(Boolean)
  const f = useForm({
    login: record?.login || '',
    firstName: record?.firstName || nameParts[0] || '',
    middleName: record?.middleName || '',
    lastName: record?.lastName || (nameParts.length > 1 ? nameParts.slice(1).join(' ') : ''),
    displayName: record?.name || '',
    dob: record?.dob || '',
    email: record?.email || '',
    mobile: record?.mobile || '',
    language: record?.language || '',
    organizations: record?.organizations || '',
    manager: record?.manager || '',
    hireDate: record?.hireDate || '',
    terminationDate: record?.terminationDate || '',
    employmentStatus: record?.employmentStatus || '',
    jobCode: record?.jobCode || '',
    jobTitle: record?.jobTitle || '',
    level: record?.level || '',
    designation: record?.designation || '',
    academicSession: record?.academicSession || '',
    section: record?.section || '',
    studentNumber: record?.studentNumber || '',
    rollNumber: record?.rollNumber || '',
    grades: record?.grades || '',
    country: record?.country || '',
    state: record?.state || '',
    city: record?.city || '',
  }, v => {
    const e = {}
    if (!v.login.trim()) e.login = 'Login name is required.'
    if (!v.firstName.trim()) e.firstName = 'First name is required.'
    if (!v.lastName.trim()) e.lastName = 'Last name is required.'
    if (!v.email.trim()) e.email = 'Email is required.'
    else if (!EMAIL_RE.test(v.email)) e.email = 'Enter a valid email address.'
    return e
  })
  const save = () => f.trySubmit(() => { onClose(); toast(edit ? 'Account updated successfully.' : 'Account created successfully.', 'success') })
  return (
    <Modal title={edit ? 'Edit account' : 'New account'} desc={edit ? 'Update this account and its profile attributes.' : 'Create an account and set its profile attributes.'} onClose={onClose} stop={stop} width={960} shake={f.shake} onShakeEnd={f.clearShake} footer={<ModalFooter onClose={onClose} onSave={save} save={edit ? 'Save changes' : 'Create account'} />}>
      <div style={{ padding:24, display:'flex', flexDirection:'column', gap:16 }}>
        {f.submitted && !f.valid && <div style={{ display:'grid' }}><ErrBanner /></div>}
        <div style={{ display:'flex', alignItems:'center', gap:16, padding:'14px 16px', border:'1px solid var(--border)', borderRadius:12, background:'var(--surface)', boxShadow:'0 1px 2px rgba(16,42,84,.03)' }}>
          {photo
            ? <img src={photo} alt="Account profile" style={{ width:64, height:64, borderRadius:'50%', objectFit:'cover', border:'2px solid var(--border-blue)', flex:'none' }} />
            : <span aria-hidden style={{ width:64, height:64, borderRadius:'50%', flex:'none', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--primary-tint)', color:'var(--primary)', fontSize:21, fontWeight:600, letterSpacing:'.02em' }}>{(((f.values.firstName[0] || '') + (f.values.lastName[0] || '')).toUpperCase()) || 'AC'}</span>}
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:14, fontWeight:600, color:'var(--ink)' }}>Profile image</div>
            <div style={{ fontSize:12.4, color:'var(--muted)', marginTop:3 }}>PNG or JPG, at least 240×240 px. Shown on the account across the console.</div>
          </div>
          <label data-ix="ghost" style={{ ...S.ghost, fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:8, cursor:'pointer' }}>
            <Icon d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12" size={14} />{photo ? 'Replace' : 'Upload'}
            <input type="file" accept="image/png,image/jpeg" style={{ display:'none' }} onChange={onPhoto} />
          </label>
          {photo && <button type="button" data-ix="ghost" onClick={() => setPhoto(null)} style={{ ...S.ghost, fontFamily:'inherit' }}>Remove</button>}
        </div>
        <Section title="Account management" hint="Sign-in identity and account type." icon="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" cols={2}>
          <Field id="u-login" label="Login name" req value={f.values.login} onChange={f.set('login')} error={f.err('login')} placeholder="e.g. sara.f" />
          <Field id="u-type" label="Account type"><Dropdown {...ddProps('uUserType', ['Human', 'Service', 'API Client', 'System'])} ariaLabel="Account type" /></Field>
        </Section>
        <Section title="Personal identity" hint="Name and personal details." icon="M20 21a8 8 0 1 0-16 0 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" cols={3}>
          <Field id="u-first" label="First name" req value={f.values.firstName} onChange={f.set('firstName')} error={f.err('firstName')} placeholder="First name" />
          <Field id="u-middle" label="Middle name" value={f.values.middleName} onChange={f.set('middleName')} placeholder="Middle name" />
          <Field id="u-last" label="Last name" req value={f.values.lastName} onChange={f.set('lastName')} error={f.err('lastName')} placeholder="Last name" />
          <Field id="u-display" label="Display name" value={f.values.displayName} onChange={f.set('displayName')} placeholder="Shown across the console" />
          <Field id="u-gender" label="Gender"><Dropdown {...ddProps('uGender', ['Female', 'Male', 'Other', 'Prefer not to say'])} ariaLabel="Gender" /></Field>
          <Field id="u-dob" label="Date of birth" type="date" value={f.values.dob} onChange={f.set('dob')} />
        </Section>
        <Section title="Contact information" icon="M4 5h16v14H4z M22 6l-10 7L2 6" cols={2}>
          <Field id="u-email" label="Email" req type="email" value={f.values.email} onChange={f.set('email')} error={f.err('email')} placeholder="name@organization.edu" />
          <Field id="u-mobile" label="Mobile no." type="tel" value={f.values.mobile} onChange={f.set('mobile')} placeholder="+91 …" />
        </Section>
        <Section title="Localization & preferences" icon="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z M2 12h20 M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" cols={3}>
          <Field id="u-language" label="Language" value={f.values.language} onChange={f.set('language')} placeholder="e.g. English" />
          <Field id="u-locale" label="Locale"><Dropdown menuPortal {...ddProps('uLocale', ['en-US', 'en-GB', 'hi-IN', 'ar-AE', 'fr-FR', 'es-ES'])} ariaLabel="Locale" /></Field>
          <Field id="u-timezone" label="Timezone"><Dropdown menuPortal {...ddProps('uTimezone', ['(GMT+05:30) India Standard Time', '(GMT+00:00) UTC', '(GMT-05:00) Eastern Time', '(GMT-08:00) Pacific Time', '(GMT+01:00) Central European Time', '(GMT+04:00) Gulf Standard Time', '(GMT+08:00) Singapore Time'])} ariaLabel="Timezone" /></Field>
        </Section>
        <Section title="Organization & employment" hint="Affiliation and employment profile." icon="M4 8h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M3 13h18" cols={3}>
          <div style={{ gridColumn:'1 / -1' }}>
            <label style={S.label}>Organization unit</label>
            <OrgUnitTree value={f.values.organizations} onSelect={f.set('organizations')} expanded={orgExpanded} setExpanded={setOrgExpanded} />
          </div>
          <Field id="u-role" label="Role"><Dropdown {...ddProps('uRole', roles.map(r => r.name))} ariaLabel="Role" /></Field>
          <Field id="u-manager" label="Manager" value={f.values.manager} onChange={f.set('manager')} placeholder="Reporting manager" />
          <Field id="u-hire" label="Hire date" type="date" value={f.values.hireDate} onChange={f.set('hireDate')} />
          <Field id="u-term" label="Termination date" type="date" value={f.values.terminationDate} onChange={f.set('terminationDate')} />
          <Field id="u-empstatus" label="Employment status" value={f.values.employmentStatus} onChange={f.set('employmentStatus')} placeholder="e.g. Full-time" />
          <Field id="u-jobcode" label="Job code" value={f.values.jobCode} onChange={f.set('jobCode')} placeholder="e.g. FAC-204" />
          <Field id="u-jobtitle" label="Job title" value={f.values.jobTitle} onChange={f.set('jobTitle')} placeholder="e.g. Senior Faculty" />
          <Field id="u-level" label="Level" value={f.values.level} onChange={f.set('level')} placeholder="e.g. L4" />
          <Field id="u-desig" label="Designation" value={f.values.designation} onChange={f.set('designation')} placeholder="e.g. Curriculum Author" />
        </Section>
        <Section title="Academic profile" icon="M22 10L12 5 2 10l10 5 10-5z M6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5" cols={3}>
          <Field id="u-session" label="Academic session" value={f.values.academicSession} onChange={f.set('academicSession')} placeholder="e.g. 2025–26" />
          <Field id="u-section" label="Section" value={f.values.section} onChange={f.set('section')} placeholder="e.g. A" />
          <Field id="u-studentno" label="Student number" value={f.values.studentNumber} onChange={f.set('studentNumber')} placeholder="e.g. STU-10233" />
          <Field id="u-rollno" label="Roll number" value={f.values.rollNumber} onChange={f.set('rollNumber')} placeholder="e.g. 24" />
          <Field id="u-grades" label="Grade level" value={f.values.grades} onChange={f.set('grades')} placeholder="e.g. Grade 9" />
        </Section>
        <Section title="Geographic profile" icon="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" cols={3}>
          <Field id="u-country" label="Country" value={f.values.country} onChange={f.set('country')} placeholder="e.g. India" />
          <Field id="u-state" label="State / Province" value={f.values.state} onChange={f.set('state')} placeholder="e.g. Karnataka" />
          <Field id="u-city" label="City" value={f.values.city} onChange={f.set('city')} placeholder="e.g. Mysuru" />
        </Section>
      </div>
    </Modal>
  )
}
