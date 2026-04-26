function MediaPage(){
      return (
        <Subpage
          eyebrow="News & Media"
          title="In the press."
          intro="Interviews, appearances, and press coverage featuring Michael Terpin and Transform Ventures across leading crypto and financial media."
        >
          <Media/>
          <CTAStrip/>
        </Subpage>
      );
    }
    ReactDOM.createRoot(document.getElementById('root')).render(<MediaPage/>);
