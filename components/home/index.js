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

import MapSection from './map';

export default props => {
  useEffect(() => {
    initWidgets();
  }, []);

  return (
    <Layout>
      <style jsx>
        {`
          .home-title {
            font-size: 70px;
            font-weight: 800;
            letter-spacing: 18px;
          }
          .home-sub-title {
            opacity: 0.8;
            font-size: 18px;
          }
        `}
      </style>
      <div className="page" id="top">
        <div className="home-section fullscreen-container" id="home">
          {/*<ScrollLink to={'about'} spy={true} smooth={true}>*/}
          {/*  <div className="scroll-down">*/}
          {/*    <i className="fa fa-angle-down scroll-down-icon"></i>*/}
          {/*  </div>*/}
          {/*</ScrollLink>*/}
          <div className="fullscreenbanner-s bg-dark">
            <ul>
              <li
                data-transition="fade"
                data-slotamount="7"
                data-title="Intro Slide"
              >
                <img src="/static/images/court_bg.jpg" alt="" />

                <div
                  className="caption tp-resizeme"
                  data-x="center"
                  data-hoffset="0"
                  data-y="center"
                  data-voffset="140"
                  style={{ fontWeight: 500, fontSize: 24 }}
                >
                  <p>
                    Competition&nbsp;&nbsp;| &nbsp;&nbsp;Passion&nbsp;&nbsp;|
                    &nbsp;&nbsp;Love
                  </p>
                </div>

                <div
                  className="caption tp-resizeme hs-line-14 home-title"
                  data-x="center"
                  data-hoffset="0"
                  data-y="center"
                  data-voffset="14"
                  style={{ color: '#ffffff', fontSize: 90 }}
                >
                  St.Vartan Hoops
                </div>
              </li>

              <li
                data-transition="fade"
                data-slotamount="7"
                data-title="Black Slide"
              >
                <img src="/static/images/kd.jpg" alt="" />

                <div
                  className="caption tp-resizeme hs-line-14 font-alt"
                  data-x="center"
                  data-hoffset="0"
                  data-y="center"
                  data-voffset="0"
                >
                  League
                </div>
              </li>

              <li
                data-transition="fade"
                data-slotamount="7"
                data-masterspeed="1000"
                data-title="Cup of Dream"
              >
                <img src="/static/images/james.jpeg" alt="" />

                <div
                  className="caption tp-resizeme mediumlarge_light_white"
                  data-x="center"
                  data-y="center"
                  data-voffset="-70"
                >
                  <a
                    href="https://vimeo.com/79802823"
                    className="big-icon-link lightbox-gallery-1 mfp-iframe"
                  >
                    <span className="big-icon big-icon-rs">
                      <i className="fa fa-play-circle"></i>
                    </span>
                  </a>
                </div>

                <div
                  className="caption tp-resizeme hs-line-14 font-alt"
                  data-x="center"
                  data-y="center"
                  data-hoffset="20"
                  data-voffset="40"
                >
                  Players
                </div>
              </li>
              <li
                data-transition="fade"
                data-slotamount="7"
                data-masterspeed="1000"
                data-title="Video Slide"
              >
                <img src="/static/images/black-series.jpg" alt="" />

                <div
                  className="caption tp-resizeme hs-line-8 font-alt"
                  data-x="30"
                  data-y="center"
                  data-voffset="-80"
                >
                  Shop
                </div>

                <div
                  className="caption tp-resizeme"
                  data-x="right"
                  data-hoffset="0"
                  data-y="center"
                  data-voffset="0"
                >
                  <iframe
                    src="http://player.vimeo.com/video/56152991?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff"
                    width="576"
                    height="330"
                    allowFullScreen
                  ></iframe>
                </div>
              </li>
            </ul>
            <div className="tp-bannertimer tp-bottom"></div>
          </div>
        </div>

        {/* About Section */}
        <section className="page-section" id="about">
          <div className="container relative">
            <h2 className="section-title font-alt align-left mb-70 mb-sm-40">
              About Studio
              <a href="#" className="section-more right">
                More about us <i className="fa fa-angle-right"></i>
              </a>
            </h2>

            <div className="section-text">
              <div className="row">
                <div className="col-md-4 mb-sm-50 mb-xs-30">
                  {/* Bar Item */}
                  <div className="progress tpl-progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow="90"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      Branding, % <span>90</span>
                    </div>
                  </div>
                  {/* End Bar Item */}

                  {/* Bar Item */}
                  <div className="progress tpl-progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow="80"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      Design, % <span>80</span>
                    </div>
                  </div>
                  {/* End Bar Item */}

                  {/* Bar Item */}
                  <div className="progress tpl-progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow="85"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      Development, % <span>85</span>
                    </div>
                  </div>
                  {/* End Bar Item */}
                </div>

                <div className="col-md-4 col-sm-6 mb-sm-50 mb-xs-30">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  maximus ligula semper metus pellentesque mattis. Maecenas
                  volutpat, diam enim sagittis quam, id porta quam. Sed id dolor
                  consectetur fermentum nibh volutpat, accumsan purus.
                </div>

                <div className="col-md-4 col-sm-6 mb-sm-50 mb-xs-30">
                  Etiam sit amet fringilla lacus. Pellentesque suscipit ante at
                  ullamcorper pulvinar neque porttitor. Integer lectus. Praesent
                  sed nisi eleifend, fermentum orci amet, iaculis libero. Donec
                  vel ultricies purus. Nam dictum sem, eu aliquam.
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End About Section */}

        {/* Divider */}
        <hr className="mt-0 mb-0 " />
        {/* End Divider */}

        {/* Services Section */}
        <section className="page-section" id="services">
          <div className="container relative">
            <h2 className="section-title font-alt mb-70 mb-sm-40">Services</h2>

            {/* Nav tabs */}
            <ul className="nav nav-tabs tpl-alt-tabs font-alt pt-30 pt-sm-0 pb-30 pb-sm-0">
              <li className="active">
                <a href="#service-branding" data-toggle="tab">
                  <div className="alt-tabs-icon">
                    <span className="icon-strategy"></span>
                  </div>
                  Branding
                </a>
              </li>
              <li>
                <a href="#service-web-design" data-toggle="tab">
                  <div className="alt-tabs-icon">
                    <span className="icon-desktop"></span>
                  </div>
                  Web Design
                </a>
              </li>
              <li>
                <a href="#service-graphic" data-toggle="tab">
                  <div className="alt-tabs-icon">
                    <span className="icon-tools"></span>
                  </div>
                  Graphic Design
                </a>
              </li>
              <li>
                <a href="#service-development" data-toggle="tab">
                  <div className="alt-tabs-icon">
                    <span className="icon-gears"></span>
                  </div>
                  Development
                </a>
              </li>
              <li>
                <a href="#service-photography" data-toggle="tab">
                  <div className="alt-tabs-icon">
                    <span className="icon-camera"></span>
                  </div>
                  Photography
                </a>
              </li>
            </ul>
            {/* End Nav tabs */}

            {/* Tab panes */}
            <div className="tab-content tpl-tabs-cont">
              {/* Service Item */}
              <div className="tab-pane fade in active" id="service-branding">
                <div className="section-text">
                  <div className="row">
                    <div className="col-md-4 mb-md-40 mb-xs-30">
                      <blockquote className="mb-0">
                        <p>
                          A&nbsp;brand for a&nbsp;company is&nbsp;like
                          a&nbsp;reputation for a&nbsp;person. You earn
                          reputation by&nbsp;trying to&nbsp;do&nbsp;hard things
                          well.
                        </p>
                        <footer>Jeff Bezos</footer>
                      </blockquote>
                    </div>
                    <div className="col-md-4 col-sm-6 mb-sm-50 mb-xs-30">
                      Maecenas volutpat, diam enim sagittis quam, id porta quam.
                      Sed id dolor consectetur fermentum volutpat nibh, accumsan
                      purus. Lorem ipsum dolor sit semper amet, consectetur
                      adipiscing elit. In maximus ligula metus pellentesque
                      mattis.
                    </div>
                    <div className="col-md-4 col-sm-6 mb-sm-50 mb-xs-30">
                      Donec vel ultricies purus. Nam dictum sem, ipsum aliquam .
                      Etiam sit amet fringilla lacus. Pellentesque suscipit ante
                      at ullamcorper pulvinar neque porttitor. Integer lectus.
                      Praesent sed nisi eleifend, fermentum orci amet, iaculis
                      libero.
                    </div>
                  </div>
                </div>
              </div>
              {/* End Service Item */}

              {/* Service Item */}
              <div className="tab-pane fade" id="service-web-design">
                <div className="section-text">
                  <div className="row">
                    <div className="col-md-4 mb-md-40 mb-xs-30">
                      <blockquote className="mb-0">
                        <p>
                          It&nbsp;doesn&rsquo;t matter how many times&nbsp;I
                          have to&nbsp;click, as&nbsp;long as&nbsp;each click
                          is&nbsp;a&nbsp;mindless, unambiguous choice.
                        </p>
                        <footer>Steve Krug</footer>
                      </blockquote>
                    </div>
                    <div className="col-md-4 col-sm-6 mb-sm-50 mb-xs-30">
                      Cras mi tortor, laoreet id ornare et, accumsan non magna.
                      Maecenas vulputate accumsan velit. Curabitur a nulla ex.
                      Nam a tincidunt ante. Vitae gravida turpis. Vestibulum
                      varius nulla non nulla scelerisque tristique.
                    </div>
                    <div className="col-md-4 col-sm-6 mb-sm-50 mb-xs-30">
                      Mauris id viverra augue, eu porttitor diam. Praesent
                      faucibus est a interdum elementum. Nam varius at ipsum id
                      dignissim. Nam a tincidunt ante lorem. Pellentesque
                      suscipit ante at ullamcorper pulvinar neque porttitor.
                    </div>
                  </div>
                </div>
              </div>
              {/* End Service Item */}

              {/* Service Item */}
              <div className="tab-pane fade" id="service-graphic">
                <div className="section-text">
                  <div className="row">
                    <div className="col-md-4 mb-md-40 mb-xs-30">
                      <blockquote className="mb-0">
                        <p>
                          Never fall in&nbsp;love with an&nbsp;idea.
                          They&rsquo;re whores. If&nbsp;the one you&rsquo;re
                          with isn&rsquo;t doing the job, there&rsquo;s always
                          another.
                        </p>
                        <footer>Chip Kidd</footer>
                      </blockquote>
                    </div>
                    <div className="col-md-4 col-sm-6 mb-sm-50 mb-xs-30">
                      Lorem ipsum dolor sit semper amet, consectetur adipiscing
                      elit. In maximus ligula metus pellentesque mattis. Donec
                      vel ultricies purus. Nam dictum sem, ipsum aliquam .
                      Praesent sed nisi eleifend, fermentum orci amet, iaculis
                      libero.
                    </div>
                    <div className="col-md-4 col-sm-6 mb-sm-50 mb-xs-30">
                      Pellentesque suscipit ante at ullamcorper pulvinar neque
                      porttitor. Integer lectus. Etiam sit amet fringilla lacus.
                      Maecenas volutpat, diam enim sagittis quam, id porta quam.
                      Sed id&nbsp;dolor consectetur fermentum volutpat nibh,
                      accumsan purus.
                    </div>
                  </div>
                </div>
              </div>
              {/* End Service Item */}

              {/* Service Item */}
              <div className="tab-pane fade" id="service-development">
                <div className="section-text">
                  <div className="row">
                    <div className="col-md-4 mb-md-40 mb-xs-30">
                      <blockquote className="mb-0">
                        <p>
                          All that is&nbsp;valuable in&nbsp;human society
                          depends upon the opportunity for development accorded
                          the individual.
                        </p>
                        <footer>Albert Einstein</footer>
                      </blockquote>
                    </div>
                    <div className="col-md-4 col-sm-6 mb-sm-50 mb-xs-30">
                      Fusce hendrerit vitae nunc id gravida. Donec euismod quis
                      ante at mattis. Mauris dictum ante sit amet enim interdum
                      semper. Vestibulum odio justo, faucibus et dictum eu,
                      malesuada nec neque. Maecenas volutpat, diam enim
                      sagittis.
                    </div>
                    <div className="col-md-4 col-sm-6 mb-sm-50 mb-xs-30">
                      Pellentesque suscipit ante at ullamcorper pulvinar neque
                      porttitor. Sed id dolor consectetur fermentum volutpat
                      nibh, accumsan purus. Lorem ipsum dolor sit semper amet,
                      consectetur adipiscing elit. Inmed maximus ligula metus
                      pellentesque.
                    </div>
                  </div>
                </div>
              </div>
              {/* End Service Item */}

              {/* Service Item */}
              <div className="tab-pane fade" id="service-photography">
                <div className="section-text">
                  <div className="row">
                    <div className="col-md-4 mb-md-40 mb-xs-30">
                      <blockquote className="mb-0">
                        <p>
                          Photography is&nbsp;the simplest thing in&nbsp;the
                          world, but it&nbsp;is&nbsp;incredibly complicated
                          to&nbsp;make it&nbsp;really work.
                        </p>
                        <footer>Martin Parr</footer>
                      </blockquote>
                    </div>
                    <div className="col-md-4 col-sm-6 mb-sm-50 mb-xs-30">
                      Donec vel ultricies purus. Nam dictum sem, ipsum aliquam .
                      Etiam sit amet fringilla lacus. Pellentesque suscipit ante
                      at ullamcorper pulvinar neque porttitor. Integer lectus.
                      Praesent sed nisi eleifend, fermentum orci amet, iaculis
                      libero.
                    </div>
                    <div className="col-md-4 col-sm-6 mb-sm-50 mb-xs-30">
                      Maecenas volutpat, diam enim sagittis quam, id porta quam.
                      Sed id dolor consectetur fermentum volutpat nibh, accumsan
                      purus. Lorem ipsum dolor sit semper amet, consectetur
                      adipiscing elit. In maximus ligula metus pellentesque
                      mattis.
                    </div>
                  </div>
                </div>
              </div>
              {/* End Service Item */}
            </div>
            {/* End Tab panes */}

            <div className="align-center">
              <a href="pages-services-1.html" className="section-more font-alt">
                View all services <i className="fa fa-angle-right"></i>
              </a>
            </div>
          </div>
        </section>
        {/* End Services Section */}

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

        {/* Features Section */}
        <section className="page-section">
          <div className="container relative">
            <h2 className="section-title font-alt mb-70 mb-sm-40">
              Why Choose Us?
            </h2>

            {/* Features Grid */}
            <div className="row multi-columns-row alt-features-grid">
              {/* Features Item */}
              <div className="col-sm-6 col-md-4 col-lg-4">
                <div className="alt-features-item align-center">
                  <div className="alt-features-icon">
                    <span className="icon-flag"></span>
                  </div>
                  <h3 className="alt-features-title font-alt">
                    We’re Creative
                  </h3>
                  <div className="alt-features-descr align-left">
                    Lorem ipsum dolor sit amet, c-r adipiscing elit. In maximus
                    ligula semper metus pellentesque mattis. Maecenas volutpat,
                    diam enim.
                  </div>
                </div>
              </div>
              {/* End Features Item */}

              {/* Features Item */}
              <div className="col-sm-6 col-md-4 col-lg-4">
                <div className="alt-features-item align-center">
                  <div className="alt-features-icon">
                    <span className="icon-clock"></span>
                  </div>
                  <h3 className="alt-features-title font-alt">
                    We’re Punctual
                  </h3>
                  <div className="alt-features-descr align-left">
                    Proin fringilla augue at maximus vestibulum. Nam pulvinar
                    vitae neque et porttitor. Praesent sed nisi eleifend, lorem
                    fermentum orci sit amet, iaculis libero.
                  </div>
                </div>
              </div>
              {/* End Features Item */}

              {/* Features Item */}
              <div className="col-sm-6 col-md-4 col-lg-4">
                <div className="alt-features-item align-center">
                  <div className="alt-features-icon">
                    <span className="icon-hotairballoon"></span>
                  </div>
                  <h3 className="alt-features-title font-alt">We have magic</h3>
                  <div className="alt-features-descr align-left">
                    Curabitur iaculis accumsan augue, nec finibus mauris pretium
                    eu. Duis placerat ex gravida nibh tristique porta. Nulla
                    facilisi. Suspendisse ultricies eros blandit.
                  </div>
                </div>
              </div>
              {/* End Features Item */}

              {/* Features Item */}
              <div className="col-sm-6 col-md-4 col-lg-4">
                <div className="alt-features-item align-center">
                  <div className="alt-features-icon">
                    <span className="icon-heart"></span>
                  </div>
                  <h3 className="alt-features-title font-alt">
                    We love minimalism
                  </h3>
                  <div className="alt-features-descr align-left">
                    Cras luctus interdum sodales. Quisque quis odio dui. Sedes
                    sit amet neque malesuada, lobortis commodo magna ntesque
                    pharetra metus vivera sagittis.
                  </div>
                </div>
              </div>
              {/* End Features Item */}

              {/* Features Item */}
              <div className="col-sm-6 col-md-4 col-lg-4">
                <div className="alt-features-item align-center">
                  <div className="alt-features-icon">
                    <span className="icon-linegraph"></span>
                  </div>
                  <h3 className="alt-features-title font-alt">
                    We’re responsible
                  </h3>
                  <div className="alt-features-descr align-left">
                    Fusce aliquet quam eget neque ultrices elementum. Nulla
                    posuere felis id arcu blandit sagittis. Eleifender
                    vestibulum purus, sit amet vulputate risus.
                  </div>
                </div>
              </div>
              {/* End Features Item */}

              {/* Features Item */}
              <div className="col-sm-6 col-md-4 col-lg-4">
                <div className="alt-features-item align-center">
                  <div className="alt-features-icon">
                    <span className="icon-chat"></span>
                  </div>
                  <h3 className="alt-features-title font-alt">
                    We're Friendly
                  </h3>
                  <div className="alt-features-descr align-left">
                    Pulvinar vitae neque et porttitor. Integer non dapibus diam,
                    ac eleifend lectus. Praesent sed nisi eleifend, fermentum
                    orci sit amet, iaculis libero interdum.
                  </div>
                </div>
              </div>
              {/* End Features Item */}
            </div>
            {/* End Features Grid */}
          </div>
        </section>
        {/* End Features Section */}

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

        {/* Shop Section */}
        <section className="page-section">
          <div className="container relative">
            <h2 className="section-title font-alt align-left mb-70 mb-sm-40">
              Bestsellers
              <a href="shop-columns-3col.html" className="section-more right">
                Our Shop <i className="fa fa-angle-right"></i>
              </a>
            </h2>

            <div className="row multi-columns-row">
              {/* Shop Item */}
              <div
                className="col-md-3 col-lg-3 mb-60 mb-xs-40 wow fadeIn"
                data-wow-delay="0.1s"
                data-wow-duration="2s"
              >
                <div className="post-prev-img">
                  <a href="shop-single.html">
                    <img src="/static/images/shop-prev-1.jpg" alt="" />
                  </a>
                  <div className="intro-label">
                    <span className="label label-danger bg-red">Sale</span>
                  </div>
                </div>
                <div className="post-prev-title font-alt align-center">
                  <a href="shop-single.html">G-Star Polo Applique Jersey</a>
                </div>
                <div className="post-prev-text align-center">
                  <del>$150.00</del>
                  &nbsp;<strong>$94.75</strong>
                </div>
                <div className="post-prev-more align-center">
                  <a href="#" className="btn btn-mod btn-gray btn-round">
                    <i className="fa fa-shopping-cart"></i> Add to cart
                  </a>
                </div>
              </div>
              {/* End Shop Item */}

              {/* Shop Item */}
              <div
                className="col-md-3 col-lg-3 mb-60 mb-xs-40 wow fadeIn"
                data-wow-delay="0.2s"
                data-wow-duration="2s"
              >
                <div className="post-prev-img">
                  <a href="shop-single.html">
                    <img src="/static/images/shop-prev-2.jpg" alt="" />
                  </a>
                </div>
                <div className="post-prev-title font-alt align-center">
                  <a href="shop-single.html">Only & Sons Pique Polo Shirt</a>
                </div>
                <div className="post-prev-text align-center">
                  <strong>$28.99</strong>
                </div>
                <div className="post-prev-more align-center">
                  <a href="#" className="btn btn-mod btn-gray btn-round">
                    <i className="fa fa-shopping-cart"></i> Add to cart
                  </a>
                </div>
              </div>
              {/* End Shop Item */}

              {/* Shop Item */}
              <div
                className="col-md-3 col-lg-3 mb-60 mb-xs-40 wow fadeIn"
                data-wow-delay="0.3s"
                data-wow-duration="2s"
              >
                <div className="post-prev-img">
                  <a href="shop-single.html">
                    <img src="/static/images/shop-prev-3.jpg" alt="" />
                  </a>
                </div>
                <div className="post-prev-title font-alt align-center">
                  <a href="shop-single.html">Longline Long Sleeve</a>
                </div>
                <div className="post-prev-text align-center">
                  <strong>$39.99</strong>
                </div>
                <div className="post-prev-more align-center">
                  <a href="#" className="btn btn-mod btn-gray btn-round">
                    <i className="fa fa-shopping-cart"></i> Add to cart
                  </a>
                </div>
              </div>
              {/* End Shop Item */}

              {/* Shop Item */}
              <div
                className="col-md-3 col-lg-3 mb-60 mb-xs-40 wow fadeIn"
                data-wow-delay="0.4s"
                data-wow-duration="2s"
              >
                <div className="post-prev-img">
                  <a href="shop-single.html">
                    <img src="/static/images/shop-prev-4.jpg" alt="" />
                  </a>
                </div>
                <div className="post-prev-title font-alt align-center">
                  <a href="shop-single.html">Polo Shirt With Floral Sleeves</a>
                </div>
                <div className="post-prev-text align-center">
                  <strong>$85.99</strong>
                </div>
                <div className="post-prev-more align-center">
                  <a href="#" className="btn btn-mod btn-gray btn-round">
                    <i className="fa fa-shopping-cart"></i> Add to cart
                  </a>
                </div>
              </div>
              {/* End Shop Item */}
            </div>
          </div>
        </section>
        {/* End Shop Section */}

        {/* Divider */}
        <hr className="mt-0 mb-0 " />
        {/* End Divider */}

        {/* Section */}
        <section className="page-section">
          <div className="container relative">
            <div className="row">
              <div className="col-md-7 mb-sm-40">
                {/* Gallery */}
                <div className="work-full-media mt-0 white-shadow wow fadeInUp">
                  <ul className="clearlist work-full-slider owl-carousel">
                    <li>
                      <img src="/static/images/promo-3.png" alt="" />
                    </li>
                    <li>
                      <img src="/static/images/full-project-2.jpg" alt="" />
                    </li>
                  </ul>
                </div>
                {/* End Gallery */}
              </div>

              <div className="col-md-5 col-lg-4 col-lg-offset-1">
                {/* About Project */}
                <div className="text">
                  <h3 className="font-alt mb-30 mb-xxs-10">Awesome Template</h3>

                  <p>
                    Phasellus facilisis mauris vel velit molestie pellentesque.
                    Donec rutrum, tortor ut elementum venenatis, purus magna
                    bibendum nisl, ut accumsan ipsum erat eu sapien.
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
            </div>
          </div>
        </section>
        {/* End Section */}

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
                  <h3 className="font-alt mb-30 mb-xxs-10">Clear Design</h3>
                  <p>
                    Phasellus facilisis mauris vel velit molestie pellentesque.
                    Donec rutrum, tortor ut elementum venenatis, purus magna
                    bibendum nisl, ut accumsan ipsum erat eu sapien.
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
                      <img src="/static/images/promo-4.png" alt="" />
                    </li>
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
        {/* End Blog Section */}

        {/* Newsletter Section */}
        <section className="small-section bg-gray-lighter">
          <div className="container relative">
            <form className="form align-center" id="mailchimp">
              <div className="row">
                <div className="col-md-8 col-md-offset-2">
                  <div className="newsletter-label font-alt">
                    Stay informed with our newsletter
                  </div>

                  <div className="mb-20">
                    <input
                      placeholder="Enter Your Email"
                      className="newsletter-field form-control input-md round mb-xs-10"
                      type="email"
                      pattern=".{5,100}"
                      required
                    />

                    <button
                      type="submit"
                      className="btn btn-mod btn-medium btn-round mb-xs-10"
                    >
                      Subscribe
                    </button>
                  </div>

                  <div className="form-tip">
                    <i className="fa fa-info-circle"></i> Please trust us, we
                    will never send you spam
                  </div>

                  <div id="subscribe-result"></div>
                </div>
              </div>
            </form>
          </div>
        </section>
        {/* End Newsletter Section */}

        {/* Contact Section */}
        <section className="page-section" id="contact">
          <div className="container relative">
            <h2 className="section-title font-alt mb-70 mb-sm-40">Find Us</h2>

            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div className="row">
                  {/* Phone */}
                  <div className="col-sm-6 col-lg-4 pt-20 pb-20 pb-xs-0">
                    <div className="contact-item">
                      <div className="ci-icon">
                        <i className="fa fa-phone"></i>
                      </div>
                      <div className="ci-title font-alt">Call Us</div>
                      <div className="ci-text">+61 3 8376 6284</div>
                    </div>
                  </div>
                  {/* End Phone */}

                  {/* Address */}
                  <div className="col-sm-6 col-lg-4 pt-20 pb-20 pb-xs-0">
                    <div className="contact-item">
                      <div className="ci-icon">
                        <i className="fa fa-map-marker"></i>
                      </div>
                      <div className="ci-title font-alt">Address</div>
                      <div className="ci-text">245 Quigley Blvd, Ste K</div>
                    </div>
                  </div>
                  {/* End Address */}

                  {/* Email */}
                  <div className="col-sm-6 col-lg-4 pt-20 pb-20 pb-xs-0">
                    <div className="contact-item">
                      <div className="ci-icon">
                        <i className="fa fa-envelope"></i>
                      </div>
                      <div className="ci-title font-alt">Email</div>
                      <div className="ci-text">
                        <a href="mailto:support@bestlooker.pro">
                          support@bestlooker.pro
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* End Email */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Contact Section */}

        <MapSection />

        {/* Foter */}
        <footer className="page-section bg-gray-lighter footer pb-60">
          <div className="container">
            {/* Footer Logo */}
            <div className="mb-30" data-aos="fade-up">
              <a href="#top">
                <img
                  src="/static/images/logo-footer.png"
                  width="78"
                  height="36"
                  alt=""
                />
              </a>
            </div>

            {/* End Footer Logo */}

            {/* Social Links */}
            <div className="footer-social-links mb-110 mb-xs-60">
              <a href="#" title="Facebook" target="_blank">
                <i className="fa fa-facebook"></i>
              </a>
              <a href="#" title="Twitter" target="_blank">
                <i className="fa fa-twitter"></i>
              </a>
              <a href="#" title="Behance" target="_blank">
                <i className="fa fa-behance"></i>
              </a>
              <a href="#" title="LinkedIn+" target="_blank">
                <i className="fa fa-linkedin"></i>
              </a>
              <a href="#" title="Pinterest" target="_blank">
                <i className="fa fa-pinterest"></i>
              </a>
            </div>
            {/* End Social Links */}

            {/* Footer Text */}
            <div className="footer-text">
              {/* Copyright */}
              <div className="footer-copy font-alt">
                <a href="https://bigfatdog.github.io/" target="_blank">
                  &copy; Yun Xing 2019
                </a>
                .
              </div>
              {/* End Copyright */}

              <div className="footer-made">Made with love for hoopers</div>
            </div>
            {/* End Footer Text */}
          </div>

          {/* Top Link */}
          <div className="link-to-top">
            <i className="fa fa-caret-up"></i>
          </div>

          {/* End Top Link */}
        </footer>
      </div>
    </Layout>
  );
};
