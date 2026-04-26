function ContactPage(){
      return (
        <Subpage
          eyebrow="Contact"
          title="Let's build the future together."
          intro="Whether you're raising capital, launching a token, or need strategic guidance — we'd love to hear about your project."
        >
          <Contact/>
        </Subpage>
      );
    }
    ReactDOM.createRoot(document.getElementById('root')).render(<ContactPage/>);
