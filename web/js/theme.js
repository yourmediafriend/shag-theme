define([
    'jquery',
    'mage/smart-keyboard-handler',
    'foundation',
    'matchMedia',
    //'jquery/jquery.hoverIntent',
    'mage/translate',
    'mage/mage',
    'mage/ie-class-fixer',
    'domReady!'
], function (
    $, 
    keyboardHandler,
    Foundation,
    mediaCheck,
    carousel,
    $t
) {
    'use strict';

    //Scroll to Top
    function scrollTop(){
    //Add data-destination to scroll to div otherwise scroll to top of page.
        if($(this).attr('data-destination')){
            var destination = $(this).attr('data-destination');
            $('body, html').animate({scrollTop: $(destination).offset().top}, 1000);
        }else{
            $('body,html').animate({ scrollTop: 0 });
        }
    }

    $('.back-top a').click(function(){
         scrollTop();
    });

    var stickyHeader = {

      init: function(){

        this.pageWrapper =  $('.page-wrapper');
        this.pageHeader = $('.page-header');
        this.toggleDesktop();

        /*mediaCheck({
          media: Foundation.media_queries.s,
          entry: $.proxy(function () {
            this.toggleDesktop()
          }, this),
          exit: $.proxy(function () {
            this.toggleMobile()
        }, this)
        });*/

      },
      toggleDesktop: function(){

        this.setSticky();
        this.pageOffset();
        this.pageScroll();

        // Need to add a throttle to these ?
        $(window).on('scroll desktop', this.pageScroll.bind(this) );
        $(window).on('resize desktop', this.pageOffset.bind(this) );

      },

      /*toggleMobile: function(){

        this.setSticky();
        this.pageOffset();
        this.pageWrapper.removeAttr("style");
        $(window).off('scroll desktop');
        $(window).off('resize desktop');

      },*/

      setSticky: function(){
        $('body').addClass('sticky-initiated');
      },
      pageOffset: function(){
        //this.pageWrapper.css({'padding-top':this.pageHeader.height()});
        this.pageWrapper.addClass('sticky-padding');
      },
      pageScroll: function(event){

        if (typeof(event) !== "undefined") {
          var scrollPos = $(event.target).scrollTop();
          if(scrollPos > 1){
            $('body').addClass('sticky-header');
            this.pageOffset();
          }else{
            $('body').removeClass('sticky-header');
            this.pageOffset();
          }
        }
      }
    }

    stickyHeader.init();

  var rePositionElements = {

    init: function(){

      mediaCheck({
        media: Foundation.media_queries.s,
        entry: $.proxy(function () {
          this.toggleDesktop()
        }, this),
        exit: $.proxy(function () {
          this.toggleMobile()
      }, this)
      });

    },
    toggleDesktop: function(){

      this.headerLinks =  $('.nav-sections .nav-sections-item-content[id="store.links"] .header.links');
      this.headerLinks.remove();
      ////
      this.vatSwitcher = $('.nav-sections .nav-sections-item-content[id="store.links"] .switcher-vat');
      if (this.vatSwitcher.length){
        this.vatSwitcher.appendTo('.panel.header');
      }

    },
    toggleMobile: function(){

      $('.header.links').clone().appendTo('.nav-sections .nav-sections-item-content[id="store.links"]');
      ////
      this.vatSwitcher = $('.panel.header .switcher-vat');
      if (this.vatSwitcher.length) {
        this.vatSwitcher.appendTo('.nav-sections .nav-sections-item-content[id="store.links"]');
      }

    }
  };


  rePositionElements.init();


    //Account Header Nav
    function accountDropNav(){

      var mouseUpdate;

      // $('.account-link').hoverIntent({
      //       over: accountOver,
      //       out: accountOff
      //   });

        function accountOff(){
          mouseUpdate = setTimeout(accountOut, 500);
        }

        function accountOver(){
          $('.header-drop-wrap').addClass('active');
        }

        function accountOut(){
          $('.header-drop-wrap').removeClass('active');
          $('.header-drop-nav').removeClass('active');
        }

        $('.account-drop-nav').mouseenter(function() {
          clearTimeout(mouseUpdate);
          $(this).parent().addClass('active');
        });

        $('.account-drop-nav').mouseleave(function() {
          accountOut();
        });

    }

  /* Media Checks ----------------------------------------------------------- */

    //IF TABLET AND DESKTOP
    mediaCheck({
        media: '(min-width: 768px)',
        entry: function mediaCheckBothLarge(){

            //Remove accordion from footer
                if($('.footer-col').length) {
                    if($('.footer-col').hasClass('ui-accordion')){
                        $('.footer-col').accordion("destroy");   
                    }
                }
        }
    });

    //IF TABLET AND MOBILE
    mediaCheck({
        media: '(max-width: 1024px)',
        entry: function mediaCheckBothSmall(){
          // Hide / Show mobile search panel
            $('.block-search .block-title').on('click',function() {
                $(this).hasClass('active') ? $(this).removeClass('active') : $(this).addClass('active');
                $('body').hasClass('open-search') ? $('body').removeClass('open-search') : $('body').addClass('open-search');
            });
        }
    });

    // IF DESKTOP ONLY
    mediaCheck({
        media: '(min-width: 1025px)',
        entry: function mediaCheckDesktop(){
            //Account Dropdown Nav
            accountDropNav();
        }
      })

      //IF TABLET ONLY
      mediaCheck({
        media: '(min-width: 768px) and (max-width: 1024px)',
        entry: function mediaCheckTablet(){}
      })


      //IF MOBILE ONLY
      mediaCheck({
        media: '(max-width: 767px)',
        entry: function mediaCheckMobile(){

            //Footer accordion
            $('.footer-col').accordion({
                    openedState: "active", 
                    collapsible: true, 
                    active: false, 
                    animate: false,
                    multipleCollapsible: false,
                    header: 'h3',
                    content: 'ul'
            });

        }
      })

});