const PRESS_DEFAULT = [
      { src: "CNBC", quote: "Called Michael Terpin the 'Godfather of Crypto' for his early advocacy and investment across the industry." },
      { src: "Yahoo Finance", quote: "'Veteran investor predicts shocking bitcoin rally by 2033.' — Coverage of Terpin's Four Seasons model." },
      { src: "Skyhorse Publishing", quote: "Author of 'Bitcoin Supercycle: How the Crypto Calendar Can Make You Rich' — 2024 release." },
    ];
    function LeadershipPage(){
      const press = tvList('press', PRESS_DEFAULT);
      const head = tvSec('pressHead');
      return (
        <Subpage
          eyebrow="Leadership"
          title="Meet the founder."
          intro="One of the most recognized figures in blockchain and digital asset — early bitcoin investor, author, and the entrepreneur CNBC called the 'Godfather of Crypto.'"
        >
          <Leader/>
          <section className="d-section">
            <div className="container">
              <div className="sec-head reveal-d" style={{textAlign:'left', marginBottom: 36}}>
                <div className="eyebrow-inline"><span className="d"/>{head.eyebrow || "Press coverage"}</div>
                <h2 style={{textAlign:'left'}}>{head.title || "What the media says."}</h2>
              </div>
              <div className="press-grid-d">
                {press.map((p, i) => (
                  <div key={i} className={`press-card reveal-d d${(i%3)+1}`}>
                    <div className="src">{p.src}</div>
                    <p>{p.quote}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <CTAStrip/>
        </Subpage>
      );
    }
    ReactDOM.createRoot(document.getElementById('root')).render(<LeadershipPage/>);
