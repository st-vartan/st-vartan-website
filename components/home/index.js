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
import Link from "next/link";

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

        {/* Section */}
        <section
          className="page-section bg-dark-alfa-70 bg-scroll"
          data-background="/static/images/section-bg-16.jpg"
        >
          <div className="container relative">
            <Slider {...settings}>
              {/* Features Item */}
              <div className="features-item">
                <div className="features-icon">
                  <span className=" icon-hotairballoon"></span>
                </div>
                <div className="features-title font-alt">We're Creative</div>
                <div className="features-descr">
                  We find the best ideas for you
                </div>
              </div>
              {/* End Features Item */}

              {/* Features Item */}
              <div className="features-item">
                <div className="features-icon">
                  <span className="icon-clock"></span>
                </div>
                <div className="features-title font-alt">We’re Punctual</div>
                <div className="features-descr">
                  We always do your tasks on time
                </div>
              </div>
              {/* End Features Item */}

              {/* Features Item */}
              <div className="features-item">
                <div className="features-icon">
                  <span className="icon-lightbulb"></span>
                </div>
                <div className="features-title font-alt">We have magic</div>
                <div className="features-descr">You will be delighted</div>
              </div>
              {/* End Features Item */}

              {/* Features Item */}
              <div className="features-item">
                <div className="features-icon">
                  <span className="icon-wine"></span>
                </div>
                <div className="features-title font-alt">We're Creative</div>
                <div className="features-descr">
                  We find the best ideas for you
                </div>
              </div>
              {/* End Features Item */}

              {/* Features Item */}
              <div className="features-item">
                <div className="features-icon">
                  <span className="icon-tools"></span>
                </div>
                <div className="features-title font-alt">We’re Punctual</div>
                <div className="features-descr">
                  We always do your tasks on time
                </div>
              </div>
              {/* End Features Item */}

              {/* Features Item */}
              <div className="features-item">
                <div className="features-icon">
                  <span className="icon-gears"></span>
                </div>
                <div className="features-title font-alt">We have magic</div>
                <div className="features-descr">You will be delighted</div>
              </div>
              {/* End Features Item */}

              {/* Features Item */}
              <div className="features-item">
                <div className="features-icon">
                  <span className="icon-browser"></span>
                </div>
                <div className="features-title font-alt">We're Creative</div>
                <div className="features-descr">
                  We find the best ideas for you
                </div>
              </div>
              {/* End Features Item */}

              {/* Features Item */}
              <div className="features-item">
                <div className="features-icon">
                  <span className="icon-wallet"></span>
                </div>
                <div className="features-title font-alt">We’re Punctual</div>
                <div className="features-descr">
                  We always do your tasks on time
                </div>
              </div>
              {/* End Features Item */}

              {/* Features Item */}
              <div className="features-item">
                <div className="features-icon">
                  <span className="icon-document"></span>
                </div>
                <div className="features-title font-alt">We have magic</div>
                <div className="features-descr">You will be delighted</div>
              </div>
              {/* End Features Item */}
            </Slider>
          </div>
        </section>
        {/* End Section */}

        {/* Blog Section */}
        <section className="page-section" id="news">
          <div className="container relative">
            <h2 className="section-title font-alt align-left mb-70 mb-sm-40">
              Latest News
              <a
                href="blog-classic-sidebar-right.html"
                className="section-more right"
              >
                All News in our blog <i className="fa fa-angle-right"></i>
              </a>
            </h2>

            <div className="row multi-columns-row">
              {/* Post Item */}
              <div
                className="col-sm-6 col-md-4 col-lg-4 mb-md-50 wow fadeIn"
                data-wow-delay="0.1s"
                data-wow-duration="2s"
              >
                <div className="post-prev-img">
                  <a href="blog-single-sidebar-right.html">
                    <img src="/static/images/post-prev-1.jpg" alt="" />
                  </a>
                </div>

                <div className="post-prev-title font-alt">
                  <a href="">New Web Design Trends</a>
                </div>

                <div className="post-prev-info font-alt">
                  <a href="">John Doe</a> | 10 December
                </div>

                <div className="post-prev-text">
                  Maecenas volutpat, diam enim sagittis quam, id porta quam. Sed
                  id dolor consectetur fermentum nibh volutpat, accumsan purus.
                </div>

                <div className="post-prev-more">
                  <a href="" className="btn btn-mod btn-gray btn-round">
                    Read More <i className="fa fa-angle-right"></i>
                  </a>
                </div>
              </div>
              {/* End Post Item */}

              {/* Post Item */}
              <div
                className="col-sm-6 col-md-4 col-lg-4 mb-md-50 wow fadeIn"
                data-wow-delay="0.2s"
                data-wow-duration="2s"
              >
                <div className="post-prev-img">
                  <a href="blog-single-sidebar-right.html">
                    <img src="/static/images/post-prev-2.jpg" alt="" />
                  </a>
                </div>

                <div className="post-prev-title font-alt">
                  <a href="">Minimalistic Design Forever</a>
                </div>

                <div className="post-prev-info font-alt">
                  <a href="">John Doe</a> | 9 December
                </div>

                <div className="post-prev-text">
                  Maecenas volutpat, diam enim sagittis quam, id porta quam. Sed
                  id dolor consectetur fermentum nibh volutpat, accumsan purus.
                </div>

                <div className="post-prev-more">
                  <a href="" className="btn btn-mod btn-gray btn-round">
                    Read More <i className="fa fa-angle-right"></i>
                  </a>
                </div>
              </div>
              {/* End Post Item */}

              {/* Post Item */}
              <div
                className="col-sm-6 col-md-4 col-lg-4 mb-md-50 wow fadeIn"
                data-wow-delay="0.3s"
                data-wow-duration="2s"
              >
                <div className="post-prev-img">
                  <a href="blog-single-sidebar-right.html">
                    <img src="/static/images/post-prev-3.jpg" alt="" />
                  </a>
                </div>

                <div className="post-prev-title font-alt">
                  <a href="">Hipster&rsquo;s Style in&nbsp;Web</a>
                </div>

                <div className="post-prev-info font-alt">
                  <a href="">John Doe</a> | 7 December
                </div>

                <div className="post-prev-text">
                  Maecenas volutpat, diam enim sagittis quam, id porta quam. Sed
                  id dolor consectetur fermentum nibh volutpat, accumsan purus.
                </div>

                <div className="post-prev-more">
                  <a href="" className="btn btn-mod btn-gray btn-round">
                    Read More <i className="fa fa-angle-right"></i>
                  </a>
                </div>
              </div>
              {/* End Post Item */}
            </div>
          </div>
        </section>

        <RuleSection />
        <MapSection />
        <FooterSection />
      </div>
    </Layout>
  );
};
