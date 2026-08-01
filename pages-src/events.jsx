    function EventsPage(){
      const head = tvSec('upcomingHead');
      return (
        <Subpage
          eyebrow="Transform Events"
          title="Where the industry connects."
          intro="Flagship blockchain conferences and digital asset networking events bringing together industry leaders, angel investors, and founders for deal-making and knowledge sharing."
        >
          <section className="d-section">
            <div className="container">
              <div className="sec-head reveal-d" style={{textAlign:'left', marginBottom: 40}}>
                <div className="eyebrow-inline"><span className="d"/>{head.eyebrow || "Upcoming"}</div>
                <h2 style={{textAlign:'left'}}>{head.title || "On the calendar."}</h2>
              </div>
              <div className="luma-embed reveal-d">
                <iframe
                  src="https://luma.com/embed/calendar/cal-8JeX51iUBkNpJmP/events"
                  title="Transform Ventures events calendar"
                  frameBorder="0"
                  allowFullScreen
                  aria-hidden="false"
                  tabIndex="0"
                />
              </div>
            </div>
          </section>
          <CTAStrip/>
        </Subpage>
      );
    }
    ReactDOM.createRoot(document.getElementById('root')).render(<EventsPage/>);
