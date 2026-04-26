const press = [
      { src: "CNBC", q: "Called Michael Terpin the 'Godfather of Crypto' for his early advocacy and investment across the industry." },
      { src: "Yahoo Finance", q: "'Veteran investor predicts shocking bitcoin rally by 2033.' — Coverage of Terpin's Four Seasons model." },
      { src: "Skyhorse Publishing", q: "Author of 'Bitcoin Supercycle: How the Crypto Calendar Can Make You Rich' — 2024 release." },
    ];
    function LeadershipPage(){
      return (
        <Subpage
          eyebrow="Leadership"
          title="Meet the founder."
          intro="One of the most recognized figures in blockchain and cryptocurrency — early bitcoin investor, author, and the entrepreneur CNBC called the 'Godfather of Crypto.'"
        >
          <Leader/>
          <section className="d-section">
            <div className="container">
              <div className="sec-head reveal-d" style={{textAlign:'left', marginBottom: 36}}>
                <div className="eyebrow-inline"><span className="d"/>Press coverage</div>
                <h2 style={{textAlign:'left'}}>What the media says.</h2>
              </div>
              <div className="press-grid-d">
                {press.map((p, i) => (
                  <div key={p.src} className={`press-card reveal-d d${(i%3)+1}`}>
                    <div className="src">{p.src}</div>
                    <p>{p.q}</p>
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
