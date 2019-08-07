const initWidgets = () => {
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
  $(window).load(function() {
    $(window).trigger('scroll');
    $(window).trigger('resize');

    // Hash menu forwarding
    if (window.location.hash && $(window.location.hash).length) {
      const hash_offset = $(window.location.hash).offset().top;
      $('html, body').animate({
        scrollTop: hash_offset,
      });
    }
  });

  //
  $(window).resize(function() {
    js_height_init();
  });

  const pageSection = $(
    '.home-section, .page-section, .small-section, .split-section'
  );
  pageSection.each(function(indx) {
    if ($(this).attr('data-background')) {
      $(this).css(
        'background-image',
        'url(' + $(this).data('background') + ')'
      );
    }
  });

  function js_height_init() {
    (function($) {
      $('.js-height-full').height($(window).height());
      $('.js-height-parent').each(function() {
        $(this).height(
          $(this)
            .parent()
            .first()
            .height()
        );
      });
    })(jQuery);
  }
};

export default initWidgets;
