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

    var name = $('[name=name]').val(),
      street = $('[name=street]').val(),
      home = $('[name=home]').val(),
      phone = $('[name=phone]').val(),
      order = $('.order__form-button'),
      popup = $('.popup'),
      title = $('.popup>.popup__title'),
      text = $('.popup>.popup__text');


    if (name.length && phone.length && street.length && home.length) {

      title.text('Заказ отправлен');
      text.text('Ваш заказ отправлен. На указанный вами телефон будут приходить уведомления о смене статуса заказа.');

    } else {

      var missedData = [];
      if (!name.length) missedData.push('Имя');
      if (!phone.length) missedData.push('Контактный телефон');
      if (!street.length || !home.length) missedData.push('Адрес доставки');
      text.text('Вы забыли указать необходимые данные: ' + missedData.join(', '));
      title.text('Неполные данные');
    }

    $.fancybox.open({
      src: "#popup"
    });

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
    menu = $('.popup-menu'),
    link = $('.hamburger-menu-link'),
    close = $('.popup-menu__close');
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
      switchColors(sectionEq);
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

  //scroll
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

  // arrow keys
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
    menu.hide();

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


  var switchColors = function (sectionEq) {

    const blackened = [1, 7];

    var dots = $('.fixed-menu__link');

    if ($.inArray(sectionEq, blackened) != -1) {
      dots.addClass('fixed-menu__link--black');
    } else {
      dots.removeClass('fixed-menu__link--black');
    }
  }


  link.on('click', function (e) {
    e.preventDefault();
    menu.show();
  });

  close.on('click', function (e) {
    e.preventDefault();
    menu.hide();
  });


});


//Burgers Slider 

$(function () {

  var items = $('.slider__item'),
    display = $('.slider__list'),
    descs = $('.desc__item'),
    texts = $('.slider__text'),
    titles = $('.section__title_burgers'),
    prices = $('.price__item'),
    isSlide = false;


  var defineSlides = function (items) {
    var activeSlide = items.filter('.active');
    return {
      activeSlide: activeSlide,
      nextSlide: activeSlide.next(),
      prevSlide: activeSlide.prev()
    }
  };

  var slideTo = function (slideEq) {

    if (isSlide) return;
    isSlide = true;

    switchDesc(slideEq);

    var position = (slideEq * -100) + '%';

    display.css({
      'transform': 'translateX(' + position + ')',
      'webkit-transform': 'translateX(' + position + ')'
    });

    items.eq(slideEq).addClass('active')
      .siblings().removeClass('active');


    setTimeout(function () {
      isSlide = false;
    }, 500);

  };



  var slide = function (direction) {
    var slide = defineSlides(items);

    if (direction == 'next') {

      if (!slide.nextSlide.length) {
        items.first().addClass('active')
          .siblings().removeClass('active');
        descs.first().addClass('active')
          .siblings().removeClass('active');
        prices.first().addClass('active')
          .siblings().removeClass('active');

        slideTo(items.first().index());
      }

      slideTo(slide.nextSlide.index());
    }

    if (direction == 'prev') {

      if (!slide.prevSlide.length) {
        items.last().addClass('active')
          .siblings().removeClass('active');
        descs.last().addClass('active')
          .siblings().removeClass('active');
        prices.last().addClass('active')
          .siblings().removeClass('active');


        slideTo(items.last().index());
      }

      slideTo(slide.prevSlide.index());
    }

  };

  var switchDesc = function (slideEq) {
    var activeSlideEq = defineSlides(items).activeSlide.index();

    titles.removeClass('exit');
    titles.removeClass('enter');
    texts.removeClass('exit');
    texts.removeClass('enter');
    prices.removeClass('active');


    texts.eq(activeSlideEq).addClass('exit');
    titles.eq(activeSlideEq).addClass('exit');

    prices.eq(slideEq).addClass('active');

    setTimeout(function () {
      descs.eq(activeSlideEq).removeClass('active');
      descs.eq(slideEq).addClass('active');
      texts.eq(slideEq).addClass('enter');
      titles.eq(slideEq).addClass('enter');
    }, 350);

  }


  $('.slider__next-arrow').on('click', function (e) {
    e.preventDefault();
    slide('next');
  });

  $('.slider__prev-arrow').on('click', function (e) {
    e.preventDefault();
    slide('prev');
  });



});


//Full Review
$(function () {

  $('.review__view').on('click', function (e) {
    var $this = $(this),
      review = $this.parent().siblings('.review__shorttext'),
      name = $this.parent().siblings('.review__title'),
      popup = $('.popup'),
      title = $('.popup>.popup__title'),
      text = $('.popup>.popup__text');

      title.text(name.text());
      text.text(review.text());

    $.fancybox.open({
      src: "#popup"
    });
  });

});