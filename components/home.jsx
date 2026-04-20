// Home page orchestrator

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "editorial",
  "divisionsVariant": "grid",
  "accent": "teal",
  "theme": "light",
  "sections": {
    "press": true, "divisions": true, "stats": true, "events": true,
    "fund": true, "leadership": true, "media": true, "blog": true,
    "partners": true, "contact": true, "cta": true
  }
}/*EDITMODE-END*/;

function Home() {
  const [state, setState] = useState(DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = useState(false);

  // apply accent + theme whenever changed
  useEffect(() => { applyAccent(state.accent); }, [state.accent]);
  useEffect(() => { document.body.dataset.theme = state.theme; }, [state.theme]);

  // edit mode message protocol
  useEffect(() => {
    const handler = (e) => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', handler);
    // announce available
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch(e){}
    return () => window.removeEventListener('message', handler);
  }, []);

  const s = state.sections;
  return (
    <>
      <Nav/>
      <Hero variant={state.heroVariant}/>
      {s.press !== false && <PressTicker/>}
      {s.divisions !== false && <Divisions variant={state.divisionsVariant}/>}
      {s.stats !== false && <Stats/>}
      {s.events !== false && <Events/>}
      {s.fund !== false && <Fund/>}
      {s.leadership !== false && <Leadership/>}
      {s.media !== false && <Media/>}
      {s.blog !== false && <Blog/>}
      {s.partners !== false && <Partners/>}
      {s.cta !== false && <CTAStrip/>}
      {s.contact !== false && <Contact/>}
      <Footer/>
      {tweaksOpen && <TweaksPanel state={state} setState={setState} onClose={() => setTweaksOpen(false)}/>}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Home/>);

// Scroll reveal observer
setTimeout(() => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // auto-reveal for sections' headers & children grids
  const autoSelectors = ['.divisions-grid', '.events-grid', '.media-grid', '.blog-grid', '.stat-tile', '.fund', '.leader', '.partners .p'];
  autoSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal', `d${Math.min(5, Math.floor(i % 4))}`);
      io.observe(el);
    });
  });

  // division card mouse tracking
  document.querySelectorAll('.division-card, .event-card').forEach(card => {
    card.addEventListener('mousemove', (ev) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${((ev.clientX - r.left) / r.width) * 100}%`);
      card.style.setProperty('--my', `${((ev.clientY - r.top) / r.height) * 100}%`);
    });
  });
}, 300);
