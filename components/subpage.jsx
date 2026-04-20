// Subpage scaffolding: reuses Nav + Footer, exposes a simple <Subpage> that renders children inside container

function Subpage({ title, eyebrow, intro, children, back = "../index.html" }) {
  useEffect(() => { document.body.dataset.theme = localStorage.getItem('tv-theme') || 'light'; applyAccent(localStorage.getItem('tv-accent') || 'teal'); }, []);
  return (
    <>
      <Nav/>
      <section style={{paddingBottom: 40, paddingTop: 80}}>
        <div className="container">
          <a href={back} className="mono" style={{display: 'inline-flex', gap: 8, alignItems: 'center', color: 'var(--ink-500)', marginBottom: 32}}>
            <Icon name="arrow" size={12} /> <span style={{transform: 'scaleX(-1)', display: 'inline-block'}}>→</span> Back
          </a>
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          <h1 style={{maxWidth: 880, fontWeight: 500}}>{title}</h1>
          {intro && <p style={{fontSize: 18, maxWidth: 640, marginTop: 20}}>{intro}</p>}
        </div>
      </section>
      {children}
      <Footer/>
    </>
  );
}

Object.assign(window, { Subpage });
