// accordeon
$(document).ready(function () {

  $('.team-acco__trigger').on('click', function (e) {
    e.preventDefault();

    var elem = $(e.target),
      item = elem.closest('.team-acco__item'),
      content = item.find('team-acco__content'),
      items = item.siblings();

      console.log(item);

    if (!item.hasClass('active')) {
      items.removeClass('active');
      item.addClass('active');
    } else {
      item.removeClass('active');
    }

  });

});