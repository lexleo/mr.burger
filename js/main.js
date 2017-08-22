// Team-Accordeon
$(document).ready(function () {

  $('.team-acco__trigger').on('click', function (e) {
    e.preventDefault();

    var elem = $(e.target),
      item = elem.closest('.team-acco__item'),
      items = item.siblings();

    if (!item.hasClass('active')) {
      items.removeClass('active');
      item.addClass('active');
    } else {
      item.removeClass('active');
    }
  });

});


// Menu-Accordeon
$(document).ready(function () {

  $('.menu-acco__trigger').on('click', function (e) {
    e.preventDefault();

    var elem = $(e.target),
      item = elem.closest('.menu-acco__item'),
      items = item.siblings();

    if (!item.hasClass('active')) {
      items.removeClass('active');
      item.addClass('active');
    } else {
      item.removeClass('active');
    }
  });

});


// Order Button
$(document).ready(function () {

  $('.order__form-button').on('click', function (e) {
    e.preventDefault();
    $('[data-fancybox]').fancybox();
  });

  $('.popup__close').on('click', function (e) {
    e.preventDefault();
    $.fancybox.close();
  });

});


// Navigation
$(function () {
  var sections = $('.section'),
    display = $('.maincontent'),
    isScroll = false;

  var md = new MobileDetect(window.navigator.userAgent);
  isMobile = md.mobile();

  var performTransition = function (sectionEq) {

    if (isScroll) return;

    isScroll = true;

    var position = (sectionEq * -100) + '%';

    display.css({
      'transform': 'translateY(' + position + ')',
      'webkit-transform': 'translateY(' + position + ')'
    });

    sections.eq(sectionEq).addClass('section-active')
      .siblings().removeClass('section-active');

    setTimeout(function () {
      isScroll = false;
      $('.fixed-menu__item').eq(sectionEq).addClass('active')
        .siblings().removeClass('active');
    }, 1000);

  }

  var defineSections = function (section) {
    var activeSection = sections.filter('.section-active');
    return {
      activeSection: activeSection,
      nextSection: activeSection.next(),
      prevSection: activeSection.prev()
    }
  };


  var scrollTo = function (direction) {
    var section = defineSections(sections);


    if (direction == 'up' && section.nextSection.length) {
      performTransition(section.nextSection.index());
    }

    if (direction == 'down' && section.prevSection.length) {
      performTransition(section.prevSection.index());
    }
  };


  $('.wrapper').on({
    wheel: function (e) {

      var deltaY = e.originalEvent.deltaY;
      var direction = deltaY > 0 ?
        'up' :
        'down';

      scrollTo(direction);

    },
    touchmove: function (e) {
      e.preventDefault();
    }
  });




  $(document).on('keydown', function (e) {

    var section = defineSections(sections);

    switch (e.keyCode) {
      case 40: //up
        if (section.nextSection.length) {
          performTransition(section.nextSection.index());
        }
      case 38: //down
        if (section.prevSection.length) {
          performTransition(section.prevSection.index());
        }
    }

  });


  $('[data-scroll-to]').on('click', function (e) {
    e.preventDefault();

    var sectionNum = parseInt($(this).attr('data-scroll-to'));

    performTransition(sectionNum);
  });

  if (isMobile) {
    $(window).swipe({
      swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
        scrollTo(direction);
      }
    });
  }

});