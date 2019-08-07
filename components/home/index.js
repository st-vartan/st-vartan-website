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
import FooterSection from './sections/footer';

export default props => {
  useEffect(() => {
    initWidgets();
  }, []);

  return (
    <Layout>
      <div className="page" id="top">
        <IntroStaticSection/>
        {/*<IntroductionSection/>*/}
        <AboutSection/>

        <hr className="mt-0 mb-0 " />

        {/* Call Action Section */}
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
                      Proin fringilla augue at maximus vestibulum. Nam pulvinar
                      vitae neque et porttitor. Integer non dapibus diam, ac
                      eleifend lectus.
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
        {/* End Call Action Section */}

        {/* Process Section */}
        <section className="page-section">
          <div className="container relative">
            {/* Features Grid */}
            <div className="row alt-features-grid">
              {/* Text Item */}
              <div className="col-sm-3">
                <div className="alt-features-item align-center">
                  <div className="alt-features-descr align-left">
                    <h4 className="mt-0 font-alt">Work process</h4>
                    Lorem ipsum dolor sit amet, c-r adipiscing elit. In maximus
                    ligula semper metus pellentesque mattis. Maecenas volutpat,
                    diam enim.
                  </div>
                </div>
              </div>
              {/* End Text Item */}

              {/* Features Item */}
              <div className="col-sm-3">
                <div className="alt-features-item align-center">
                  <div className="alt-features-icon">
                    <span className="icon-chat"></span>
                  </div>
                  <h3 className="alt-features-title font-alt">1. Discuss</h3>
                </div>
              </div>
              {/* End Features Item */}

              {/* Features Item */}
              <div className="col-sm-3">
                <div className="alt-features-item align-center">
                  <div className="alt-features-icon">
                    <span className="icon-browser"></span>
                  </div>
                  <h3 className="alt-features-title font-alt">2. Make</h3>
                </div>
              </div>
              {/* End Features Item */}

              {/* Features Item */}
              <div className="col-sm-3">
                <div className="alt-features-item align-center">
                  <div className="alt-features-icon">
                    <span className="icon-heart"></span>
                  </div>
                  <h3 className="alt-features-title font-alt">3. Product</h3>
                </div>
              </div>
              {/* End Features Item */}
            </div>
            {/* End Features Grid */}
          </div>
        </section>
        {/* End Process Section */}

        {/* Divider */}
        <hr className="mt-0 mb-0" />
        {/* End Divider */}

        {/* Portfolio Section */}
        <section className="page-section pb-0" id="portfolio">
          <div className="relative">
            <h2 className="section-title font-alt mb-70 mb-sm-40">
              Latest Works
            </h2>

            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2">
                  <div className="section-text align-center mb-70 mb-xs-40">
                    Curabitur eu adipiscing lacus, a iaculis diam. Nullam
                    placerat blandit auctor. Nulla accumsan ipsum et nibh
                    rhoncus, eget tempus sapien ultricies. Donec mollis lorem
                    vehicula.
                  </div>
                </div>
              </div>
            </div>

            {/* Works Grid */}
            <ul
              className="works-grid work-grid-3 work-grid-gut clearfix font-alt hover-white hide-titles"
              id="work-grid"
            >
              {/* Work Item (External Page) */}
              <li className="work-item">
                <a href="portfolio-single-1.html" className="work-ext-link">
                  <div className="work-img">
                    <img
                      className="work-img"
                      src="/static/images/projects-13.jpg"
                      alt="Work"
                    />
                  </div>
                  <div className="work-intro">
                    <h3 className="work-title">Man</h3>
                    <div className="work-descr">External Page</div>
                  </div>
                </a>
              </li>
              {/* End Work Item */}

              {/* Work Item (External Page) */}
              <li className="work-item">
                <a href="portfolio-single-1.html" className="work-ext-link">
                  <div className="work-img">
                    <img
                      className="work-img"
                      src="/static/images/projects-14.jpg"
                      alt="Work"
                    />
                  </div>
                  <div className="work-intro">
                    <h3 className="work-title">Woman</h3>
                    <div className="work-descr">External Page</div>
                  </div>
                </a>
              </li>
              {/* End Work Item */}

              {/* Work Item (External Page) */}
              <li className="work-item">
                <a href="portfolio-single-1.html" className="work-ext-link">
                  <div className="work-img">
                    <img
                      className="work-img"
                      src="/static/images/projects-6.jpg"
                      alt="Work"
                    />
                  </div>
                  <div className="work-intro">
                    <h3 className="work-title">Man with bag</h3>
                    <div className="work-descr">External Page</div>
                  </div>
                </a>
              </li>
              {/* End Work Item */}
            </ul>
            {/* End Works Grid */}
          </div>
        </section>
        {/* End Portfolio Section */}

        {/* Call Action Section */}
        <section className="small-section bg-dark">
          <div className="container relative">
            <div className="align-center">
              <h3 className="banner-heading font-alt">
                Want to see more works?
              </h3>
              <div>
                <a
                  href="portfolio-wide-gutter-3col.html"
                  className="btn btn-mod btn-w btn-medium btn-round"
                >
                  Lets view portfolio
                </a>
              </div>
            </div>
          </div>
        </section>
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
        {/* End Testimonials Section */}

        {/* Divider */}
        <hr className="mt-0 mb-0 " />
        {/* End Divider */}

        {/* Divider */}
        <hr className="mt-0 mb-0 " />
        {/* End Divider */}

        {/* Section */}
        <section className="page-section">
          <div className="container relative">
            <div className="row">
              <div className="col-md-5 col-lg-4 mb-sm-40">
                {/* About Project */}
                <div className="text">
                  <h3 className="font-alt mb-30 mb-xxs-10">Rules</h3>
                  <p>
                    But the height of the rim on the 35th street side has always
                    been 11 feet and the height of the of the 36 street side has
                    always been 10 1/2. And the out of bounds has always been
                    the poles
                  </p>
                  <p>
                    “The regulars like us “ use that to our advantage to beat
                    any non regular that come to the courts . It is our rules ,
                    just like every court in New York City has their rules
                  </p>
                  <p>
                    So maybe we should just leave it how it is , I know some of
                    you go play elsewhere and it’s not the same. That’s why this
                    our court with our rules and maybe we should keep it that
                    way . If you can shoot on a 11 double foot rim than you can
                    shoot anywhere . What I would say is just leave it how it is
                    , because you guys are use to it already . Just protect the
                    court when you see an unfamiliar face , more importantly an
                    unfamiliar 5 , and just win .
                  </p>

                  <div className="mt-40">
                    <a
                      href="http://themeforest.net/user/theme-guru/portfolio"
                      className="btn btn-mod btn-border btn-round btn-medium"
                      target="_blank"
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
                {/* End About Project */}
              </div>

              <div className="col-md-7 col-lg-offset-1">
                {/* Work Gallery */}
                <div className="work-full-media mt-0 white-shadow wow fadeInUp">
                  <ul className="clearlist work-full-slider owl-carousel">
                    <li>
                      <img src="/static/images/full-project-4.jpg" alt="" />
                    </li>
                  </ul>
                </div>
                {/* End Work Gallery */}
              </div>
            </div>
          </div>
        </section>
        {/* End Section */}

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
        <FooterSection/>
      </div>
    </Layout>
  );
};
