import AOS from "aos";
import $ from 'jquery';

const initWidgets = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
    }

    AOS.init({
        duration: 1500,
    });

    /* ---------------------------------------------
         Scripts initialization
         --------------------------------------------- */

    $(window).load(function() {
        $(window).trigger('scroll');
        $(window).trigger('resize');

        // Hash menu forwarding
        if (window.location.hash && $(window.location.hash).length) {
            var hash_offset = $(window.location.hash).offset().top;
            $('html, body').animate({
                scrollTop: hash_offset,
            });
        }
    });

    $(document).ready(function() {
        init_classic_menu();
    });
    //
    $(window).resize(function() {
        js_height_init();
        init_classic_menu_resize();
    });

    /* --------------------------------------------
         Platform detect
         --------------------------------------------- */
    var mobileTest;
    if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
    ) {
        mobileTest = true;
        $('html').addClass('mobile');
    } else {
        mobileTest = false;
        $('html').addClass('no-mobile');
    }

    var mozillaTest;
    if (/mozilla/.test(navigator.userAgent)) {
        mozillaTest = true;
    } else {
        mozillaTest = false;
    }
    var safariTest;
    if (/safari/.test(navigator.userAgent)) {
        safariTest = true;
    } else {
        safariTest = false;
    }

    // Detect touch devices
    if (!('ontouchstart' in document.documentElement)) {
        document.documentElement.className += ' no-touch';
    }

    /* ---------------------------------------------
         Sections helpers
         --------------------------------------------- */

    // Sections backgrounds

    var pageSection = $(
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

    // Function for block height 100%
    function height_line(height_object, height_donor) {
        height_object.height(height_donor.height());
        height_object.css({
            'line-height': height_donor.height() + 'px',
        });
    }

    // Function equal height
    !(function(a) {
        (a.fn.equalHeights = function() {
            var b = 0,
                c = a(this);
            return (
                c.each(function() {
                    var c = a(this).innerHeight();
                    c > b && (b = c);
                }),
                    c.css('height', b)
            );
        }),
            a('[data-equal]').each(function() {
                var b = a(this),
                    c = b.data('equal');
                b.find(c).equalHeights();
            });
    })(jQuery);

    // Progress bars
    var progressBar = $('.progress-bar');
    progressBar.each(function(indx) {
        $(this).css('width', $(this).attr('aria-valuenow') + '%');
    });

    /* ---------------------------------------------
         Nav panel classic
         --------------------------------------------- */

    var mobile_nav = $('.mobile-nav');
    var desktop_nav = $('.desktop-nav');

    function init_classic_menu_resize() {
        // Mobile menu max height
        $('.mobile-on .desktop-nav > ul').css(
            'max-height',
            $(window).height() - $('.main-nav').height() - 20 + 'px'
        );

        // Mobile menu style toggle
        if ($(window).width() <= 1024) {
            $('.main-nav').addClass('mobile-on');
        } else if ($(window).width() > 1024) {
            $('.main-nav').removeClass('mobile-on');
            desktop_nav.show();
        }
    }

    /* ---------------------------------------------
         Height 100%
         --------------------------------------------- */
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

    function init_classic_menu() {
        mobile_nav = $('.mobile-nav');
        desktop_nav = $('.desktop-nav');
        height_line($('.inner-nav > ul > li > a'), $('.main-nav'));
        height_line(mobile_nav, $('.main-nav'));

        mobile_nav.css({
            width: $('.main-nav').height() + 'px',
        });

        // Transpaner menu

        if ($('.main-nav').hasClass('transparent')) {
            $('.main-nav').addClass('js-transparent');
        }

        $(window).scroll(function() {
            if ($(window).scrollTop() > 10) {
                $('.js-transparent').removeClass('transparent');
                $('.main-nav, .nav-logo-wrap .logo, .mobile-nav').addClass(
                    'small-height'
                );
            } else {
                $('.js-transparent').addClass('transparent');
                $('.main-nav, .nav-logo-wrap .logo, .mobile-nav').removeClass(
                    'small-height'
                );
            }
        });

        // Mobile menu toggle

        mobile_nav.click(function() {
            if (desktop_nav.hasClass('js-opened')) {
                desktop_nav.slideUp('slow', 'easeOutExpo').removeClass('js-opened');
                $(this).removeClass('active');
            } else {
                desktop_nav.slideDown('slow', 'easeOutQuart').addClass('js-opened');
                $(this).addClass('active');

                // Fix for responsive menu
                if ($('.main-nav').hasClass('not-top')) {
                    $(window).scrollTo('.main-nav', 'slow');
                }
            }
        });

        desktop_nav.find('a:not(.mn-has-sub)').click(function() {
            if (mobile_nav.hasClass('active')) {
                desktop_nav.slideUp('slow', 'easeOutExpo').removeClass('js-opened');
                mobile_nav.removeClass('active');
            }
        });

        // Sub menu

        var mnHasSub = $('.mn-has-sub');
        var mnThisLi;

        $('.mobile-on .mn-has-sub')
            .find('.fa:first')
            .removeClass('fa-angle-right')
            .addClass('fa-angle-down');

        mnHasSub.click(function() {
            if ($('.main-nav').hasClass('mobile-on')) {
                mnThisLi = $(this).parent('li:first');
                if (mnThisLi.hasClass('js-opened')) {
                    mnThisLi.find('.mn-sub:first').slideUp(function() {
                        mnThisLi.removeClass('js-opened');
                        mnThisLi
                            .find('.mn-has-sub')
                            .find('.fa:first')
                            .removeClass('fa-angle-up')
                            .addClass('fa-angle-down');
                    });
                } else {
                    $(this)
                        .find('.fa:first')
                        .removeClass('fa-angle-down')
                        .addClass('fa-angle-up');
                    mnThisLi.addClass('js-opened');
                    mnThisLi.find('.mn-sub:first').slideDown();
                }

                return false;
            } else {
            }
        });

        mnThisLi = mnHasSub.parent('li');
        mnThisLi.hover(
            function() {
                if (!$('.main-nav').hasClass('mobile-on')) {
                    $(this)
                        .find('.mn-sub:first')
                        .stop(true, true)
                        .fadeIn('fast');
                }
            },
            function() {
                if (!$('.main-nav').hasClass('mobile-on')) {
                    $(this)
                        .find('.mn-sub:first')
                        .stop(true, true)
                        .delay(100)
                        .fadeOut('fast');
                }
            }
        );

        /* Keyboard navigation for main menu */

        $('.inner-nav a').focus(function() {
            if (!$('.main-nav').hasClass('mobile-on')) {
                $(this)
                    .parent('li')
                    .parent()
                    .children()
                    .find('.mn-sub:first')
                    .stop(true, true)
                    .delay(100)
                    .fadeOut('fast');
            }
        });

        $('.inner-nav a')
            .first()
            .keydown(function(e) {
                if (!$('.main-nav').hasClass('mobile-on')) {
                    if (e.shiftKey && e.keyCode == 9) {
                        $(this)
                            .parent('li')
                            .find('.mn-sub:first')
                            .stop(true, true)
                            .delay(100)
                            .fadeOut('fast');
                    }
                }
            });

        $('.mn-sub li:last a').keydown(function(e) {
            if (!$('.main-nav').hasClass('mobile-on')) {
                if (!e.shiftKey && e.keyCode == 9) {
                    $(this)
                        .parent('li')
                        .parent()
                        .stop(true, true)
                        .delay(100)
                        .fadeOut('fast');
                }
            }
        });

        $(document).keydown(function(e) {
            if (!$('.main-nav').hasClass('mobile-on')) {
                if (e.keyCode == 27) {
                    if (
                        mnHasSub
                            .parent('li')
                            .find('.mn-sub:first li .mn-sub')
                            .is(':visible')
                    ) {
                        mnHasSub
                            .parent('li')
                            .find('.mn-sub:first li .mn-sub')
                            .stop(true, true)
                            .delay(100)
                            .fadeOut('fast');
                    } else {
                        mnHasSub
                            .parent('li')
                            .find('.mn-sub:first')
                            .stop(true, true)
                            .delay(100)
                            .fadeOut('fast');
                    }
                }
            }
        });

        mnHasSub.focus(function() {
            if (!$('.main-nav').hasClass('mobile-on')) {
                $(this)
                    .parent('li')
                    .find('.mn-sub:first')
                    .stop(true, true)
                    .fadeIn('fast');
            }
        });
    }
}

export default initWidgets;