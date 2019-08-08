import Slider from 'react-slick';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const quote = () => {
  return (
    <section
      className="page-section bg-dark bg-dark-alfa-90 fullwidth-slider"
      data-background="/static/images/section-bg-3.jpg"
    >
      <Slider {...settings}>
        <div>
          <div className="container relative">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 align-center">
                {/* Section Icon */}
                <div className="section-icon">
                  <span className="icon-quote"></span>
                </div>
                {/* Section Title */}
                <h3 className="small-title font-alt">Manifest</h3>
                <blockquote className="testimonial white">
                  <p>
                    Phasellus luctus commodo ullamcorper a posuere rhoncus
                    commodo elit. Aenean congue, risus utaliquam dapibus.
                    Thanks!
                  </p>
                  <footer className="testimonial-author">Seally.</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="container relative">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 align-center">
                {/* Section Icon */}
                <div className="section-icon">
                  <span className="icon-quote"></span>
                </div>
                {/* Section Title */}
                <h3 className="small-title font-alt">What people say?</h3>
                <blockquote className="testimonial white">
                  <p>
                    Phasellus luctus commodo ullamcorper a posuere rhoncus
                    commodo elit. Aenean congue, risus utaliquam dapibus.
                    Thanks!
                  </p>
                  <footer className="testimonial-author">George.</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="container relative">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 align-center">
                {/* Section Icon */}
                <div className="section-icon">
                  <span className="icon-quote"></span>
                </div>
                {/* Section Title */}
                <h3 className="small-title font-alt">What people say?</h3>
                <blockquote className="testimonial white">
                  <p>
                    Phasellus luctus commodo ullamcorper a posuere rhoncus
                    commodo elit. Aenean congue, risus utaliquam dapibus.
                    Thanks!
                  </p>
                  <footer className="testimonial-author">Jordan.</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </section>
  );
};

export default quote;
