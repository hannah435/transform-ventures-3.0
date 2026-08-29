function PostPage(){
      const posts = tvList('posts', []);
      const search = (typeof window !== 'undefined' && window.location && window.location.search) || '';
      // Static per-post pages (post-<slug>.html) carry no ?id=, so the build injects
      // __TV_POST_ID__; the query string still wins for legacy ?id= links.
      const id = new URLSearchParams(search).get('id')
        || (typeof window !== 'undefined' && window.__TV_POST_ID__)
        || null;
      const post = posts.find(p => p.id === id) || posts[0] || null;

      React.useEffect(() => {
        const io = new IntersectionObserver((entries) => {
          entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        document.querySelectorAll('.reveal-d').forEach(el => io.observe(el));
      }, []);

      if (!post) {
        return (
          <>
            <Nav/>
            <section className="d-page-hero">
              <div className="container">
                <a href={`${P}blog`} className="back-link">← All posts</a>
                <h1><span className="grad">Post not found.</span></h1>
                <p className="lead">This article may have been moved or removed.</p>
              </div>
            </section>
            <Footer/>
          </>
        );
      }

      const body = Array.isArray(post.body) ? post.body : [];
      return (
        <>
          <Nav/>
          <section className="d-page-hero">
            <div className="container">
              <a href={`${P}blog`} className="back-link">← All posts</a>
              <div className="eyebrow-inline"><span className="d"/>{post.tag}{post.date ? ` · ${post.date}` : ''}</div>
              <h1><span className="grad">{post.title}</span></h1>
              {post.lede && <p className="lead">{post.lede}</p>}
            </div>
          </section>
          <section className="d-section">
            <div className="container">
              <article className="blog-article-d reveal-d" style={{maxWidth: 760, margin: '0 auto'}}>
                {body.map((para, j) => <p key={j}>{para}</p>)}
              </article>
            </div>
          </section>
          <CTAStrip/>
          <Footer/>
        </>
      );
    }
    ReactDOM.createRoot(document.getElementById('root')).render(<PostPage/>);
