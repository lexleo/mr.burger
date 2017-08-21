// team-accordeon
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


// menu-accordeon
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


// Order button
$(document).ready(function () {

  $('.order__form-button').on('click', function(e) {
    e.preventDefault();
    $('[data-fancybox]').fancybox();
  });

  $('.popup__close').on('click', function (e) {
    e.preventDefault();
    $.fancybox.close();
  });

});