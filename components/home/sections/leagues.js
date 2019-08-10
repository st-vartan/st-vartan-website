const leagues = () => (
  <section
    className="page-section banner-section bg-dark bg-dark-alpha-80"
    data-background="/static/images/court_bg.jpg"
    style={{
      backgroundImage: 'url(/static/images/court_bg.jpg)',
      opacity: 1,
      display: 'block',
    }}
  >
    <div className="container relative">
      <div className="row">
        <div className="col-md-8 col-md-offset-2 align-center">
          <div className="section-icon">
            <span className="icon-trophy" />
          </div>
          <h3 className="section-title font-alt">2019 Summer Tour</h3>
          <div className="white mb-30">
              St.Vartan Basketball Tournament is a summer street basketball league running for 10 weeks 7 DAYS A WEEK from  June - August every summer.
          </div>
            <a href="pages-contact-1.html" className="btn btn-mod btn-w btn-medium btn-round">Join League</a>
        </div>
      </div>
    </div>
  </section>
);

export default leagues;
