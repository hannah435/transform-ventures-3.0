// Tweaks panel — accent color, section toggles, dark mode

const SECTIONS = [
  { key: "press", label: "Press Ticker" },
  { key: "divisions", label: "Divisions" },
  { key: "stats", label: "Stats" },
  { key: "events", label: "Events" },
  { key: "fund", label: "Supercycle Fund" },
  { key: "leadership", label: "Leadership" },
  { key: "media", label: "News & Media" },
  { key: "blog", label: "Blog" },
  { key: "partners", label: "Partners" },
  { key: "contact", label: "Contact" },
  { key: "cta", label: "CTA Strip" },
];

const ACCENTS = [
  { name: "teal",   main: "#0FB5A5", hover: "#0A9488", tint: "#E6FAF7" },
  { name: "purple", main: "#6D4AFF", hover: "#5B37E8", tint: "#EEEAFF" },
  { name: "orange", main: "#F7931A", hover: "#D97D0C", tint: "#FFF3E1" },
  { name: "black",  main: "#0B0D12", hover: "#2A2E39", tint: "#F2F3F7" },
];

const TweaksPanel = ({ state, setState, onClose }) => {
  const setKey = (k, v) => {
    const next = { ...state, [k]: v };
    setState(next);
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*'); } catch(e){}
  };
  const toggleSection = (k) => {
    const next = { ...state.sections, [k]: !state.sections[k] };
    setKey('sections', next);
  };

  return (
    <div className="tweaks-panel visible">
      <div className="tweaks-head">
        <span className="title">Tweaks</span>
        <button onClick={onClose} style={{background:'none',border:'none',padding:4,color:'var(--ink-500)'}}><Icon name="close" size={16}/></button>
      </div>
      <div className="tweaks-body">
        <div className="tweak-group">
          <span className="lbl">Hero variant</span>
          <div className="tweak-segment">
            {["split","editorial","bold"].map(v => (
              <button key={v} className={state.heroVariant === v ? 'active' : ''} onClick={() => setKey('heroVariant', v)}>{v}</button>
            ))}
          </div>
        </div>

        <div className="tweak-group">
          <span className="lbl">Divisions layout</span>
          <div className="tweak-segment">
            {["grid","index","tabs"].map(v => (
              <button key={v} className={state.divisionsVariant === v ? 'active' : ''} onClick={() => setKey('divisionsVariant', v)}>{v}</button>
            ))}
          </div>
        </div>

        <div className="tweak-group">
          <span className="lbl">Accent color</span>
          <div className="tweak-colors">
            {ACCENTS.map(a => (
              <button
                key={a.name}
                className={state.accent === a.name ? 'active' : ''}
                style={{ '--c': a.main }}
                onClick={() => setKey('accent', a.name)}
                aria-label={a.name}
              />
            ))}
          </div>
        </div>

        <div className="tweak-group">
          <span className="lbl">Theme</span>
          <div className="tweak-segment">
            {["light","dark"].map(v => (
              <button key={v} className={state.theme === v ? 'active' : ''} onClick={() => setKey('theme', v)}>{v}</button>
            ))}
          </div>
        </div>

        <div className="tweak-group">
          <span className="lbl">Sections</span>
          {SECTIONS.map(s => (
            <label key={s.key} className="tweak-row">
              <span>{s.label}</span>
              <input type="checkbox" checked={state.sections[s.key] !== false} onChange={() => toggleSection(s.key)}/>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

// Apply accent vars to :root
const applyAccent = (name) => {
  const a = ACCENTS.find(x => x.name === name) || ACCENTS[0];
  const r = document.documentElement;
  r.style.setProperty('--accent', a.main);
  r.style.setProperty('--accent-600', a.hover);
  r.style.setProperty('--accent-050', a.tint);
};

Object.assign(window, { TweaksPanel, ACCENTS, SECTIONS, applyAccent });
