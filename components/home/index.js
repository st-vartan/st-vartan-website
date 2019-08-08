import { useEffect } from 'react';

import Layout from '../layout';
import Slider from 'react-slick';
import { Link as ScrollLink } from 'react-scroll';
import initWidgets from './initWidgets';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

import MapSection from './sections/map';
import RuleSection from './sections/rules';
import IntroductionSection from './sections/introduction';
import IntroStaticSection from './sections/introduction-static';
import AboutSection from './sections/about';
import IntroDetailSection from './sections/intro-detail';
import FooterSection from './sections/footer';
import LatestGallerySection from './sections/latest-gallery';
import TeamsSection from './sections/teams';

export default props => {
  useEffect(() => {
    initWidgets();
  }, []);

  return (
    <Layout>
      <div className="page" id="top">
        <IntroStaticSection />
        {/*<IntroductionSection/>*/}
        <AboutSection />
        <hr className="mt-0 mb-0 " />
        <IntroDetailSection />
        <hr className="mt-0 mb-0" />
        <LatestGallerySection/>

        {/* Call Action Section */}

        {/* End Call Action Section */}

        {/* Testimonials Section */}
        <section
          className="page-section bg-dark bg-dark-alfa-90 fullwidth-slider"
          data-background="/static/images/section-bg-3.jpg"
        >
          <Slider {...settings}>
            {/* Slide Item */}
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
                      <footer className="testimonial-author">
                        John Doe, doodle inc.
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
            {/* End Slide Item */}

            {/* Slide Item */}
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
                      <footer className="testimonial-author">
                        John Doe, doodle inc.
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
            {/* End Slide Item */}

            {/* Slide Item */}
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
                      <footer className="testimonial-author">
                        John Doe, doodle inc.
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
            {/* End Slide Item */}
          </Slider>
        </section>
        <hr className="mt-0 mb-0 " />
        <hr className="mt-0 mb-0 " />
        <TeamsSection/>
        <RuleSection />
        <MapSection />
        <FooterSection />
      </div>
    </Layout>
  );
};
