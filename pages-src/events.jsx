const UPCOMING = [
      { date: "Sep 2026", city: "Las Vegas", name: "Tokenize Las Vegas", tag: "Flagship Conference", bg: "linear-gradient(135deg, #6D4AFF, #3A1F9E)" },
      { date: "Jun 2026", city: "San Juan, PR", name: "BitAngels Summer Summit", tag: "Angel Network", bg: "linear-gradient(135deg, #F7931A, #B25E00)" },
      { date: "Ongoing", city: "By invitation", name: "Tiger Mansion Dinners", tag: "Invite Only", bg: "linear-gradient(135deg, #0FB5A5, #0A6B63)" },
    ];
    function EventsPage(){
      return (
        <Subpage
          eyebrow="Transform Events"
          title="Where the industry connects."
          intro="Flagship blockchain conferences and crypto networking events bringing together industry leaders, angel investors, and founders for deal-making and knowledge sharing."
        >
          <section className="d-section">
            <div className="container">
              <div className="sec-head reveal-d" style={{textAlign:'left', marginBottom: 40}}>
                <div className="eyebrow-inline"><span className="d"/>Upcoming</div>
                <h2 style={{textAlign:'left'}}>On the calendar.</h2>
              </div>
              <div className="events-list-d">
                {UPCOMING.map((e, i) => (
                  <div key={e.name} className={`event-row-d reveal-d d${(i%3)+1}`}>
                    <div className="swatch" style={{background: e.bg}}/>
                    <div>
                      <div className="date">{e.date}</div>
                      <div className="city">{e.city}</div>
                    </div>
                    <div>
                      <div className="name">{e.name}</div>
                      <div className="tag-line">{e.tag}</div>
                    </div>
                    <a href="#" className="btn-outline">Details →</a>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <EventsList/>
          <CTAStrip/>
        </Subpage>
      );
    }
    ReactDOM.createRoot(document.getElementById('root')).render(<EventsPage/>);
