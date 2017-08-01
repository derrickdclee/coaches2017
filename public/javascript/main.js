
$(document).ready(function() {
  $('.rules-text > a').on('click', function(e) {
    e.preventDefault();
    const hash = this.hash;
    const height = $(hash).offset().top;
    $('html, body').animate({
      scrollTop: height
    }, 600, function() {
      window.location.hash = hash;
    });
  });

  let height = $('.navbar').offset().top;

  $(window).on('scroll', function() {
    if ($(window).scrollTop() >= height) {
      $('.navbar').addClass('goToTop');
    } else {
      $('.navbar').removeClass('goToTop');
    }
  });

  $(window).on('resize', function() {
    height = $('.navbar').offset().top;
  });
});
