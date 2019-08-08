const introDetail = () => (
  <section
    className="page-section pt-0 pb-0 banner-section bg-dark"
    data-background="/static/images/section-bg-2.jpg"
  >
    <div className="container relative">
      <div className="row">
        <div className="col-sm-6">
          <div className="mt-140 mt-lg-80 mb-140 mb-lg-80">
            <div className="banner-content">
              <h3 className="banner-heading font-alt">
                Looking for exclusive digital services?
              </h3>
              <div className="banner-decription">
                Proin fringilla augue at maximus vestibulum. Nam pulvinar vitae
                neque et porttitor. Integer non dapibus diam, ac eleifend
                lectus.
              </div>
              <div>
                <a
                  href="pages-contact-1.html"
                  className="btn btn-mod btn-w btn-medium btn-round"
                >
                  Lets talk
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 banner-image" data-aos={'fade-up'}>
          <img src="/static/images/promo-1.png" alt="" />
        </div>
      </div>
    </div>
  </section>
);

export default introDetail;
