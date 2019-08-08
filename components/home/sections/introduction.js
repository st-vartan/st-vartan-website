import { useEffect } from 'react';

const introduction = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }
    const $ = window.jQuery || window.$;

    /* ---------------------------------------------
               Scripts initialization
               --------------------------------------------- */
    $(document).ready(function() {
      $('.fullscreenbanner-s').revolution({
        dottedOverlay: 'none',
        // delay: 16000,
        startwidth: 1170,
        startheight: 600,
        hideThumbs: 200,

        thumbWidth: 100,
        thumbHeight: 50,
        thumbAmount: 5,

        navigationType: 'bullet',
        navigationArrows: 'solo',
        navigationStyle: 'preview4',

        touchenabled: 'on',
        onHoverStop: 'on',

        swipe_velocity: 0.7,
        swipe_min_touches: 1,
        swipe_max_touches: 1,
        drag_block_vertical: false,

        parallax: 'mouse',
        parallaxBgFreeze: 'on',
        parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],

        keyboardNavigation: 'off',

        navigationHAlign: 'center',
        navigationVAlign: 'bottom',
        navigationHOffset: 0,
        navigationVOffset: 20,

        soloArrowLeftHalign: 'left',
        soloArrowLeftValign: 'center',
        soloArrowLeftHOffset: 20,
        soloArrowLeftVOffset: 0,

        soloArrowRightHalign: 'right',
        soloArrowRightValign: 'center',
        soloArrowRightHOffset: 20,
        soloArrowRightVOffset: 0,

        shadow: 0,
        fullWidth: 'on',
        fullScreen: 'off',

        spinner: 'spinner4',

        stopLoop: 'off',
        stopAfterLoops: -1,
        stopAtSlide: -1,

        shuffle: 'off',

        autoHeight: 'off',
        forceFullWidth: 'off',

        hideThumbsOnMobile: 'off',
        hideNavDelayOnMobile: 1500,
        hideBulletsOnMobile: 'off',
        hideArrowsOnMobile: 'off',
        hideThumbsUnderResolution: 0,

        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLimit: 0,
        startWithSlide: 0,
      });
    });
  }, []);

  return (
    <div className="home-section fullscreen-container" id="home">
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
  );
};

export default introduction;
