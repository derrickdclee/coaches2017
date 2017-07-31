
$(document).ready(function() {
  let topOfLogo = $('.logo').offset().top;
  let heightOfLogo = $('.logo').outerHeight(true);

  $(window).on('resize', function() {
    topOfLogo = $('.logo').offset().top;
    heightOfLogo = $('.logo').outerHeight(true);
  })
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > (topOfLogo + heightOfLogo) ) {
      console.log(topOfLogo + heightOfLogo);
      $('nav').addClass('goToTop');
    } else {
      $('nav').removeClass('goToTop');
    }
  });
  $('.rules-text > a').on('click', function(e) {
    e.preventDefault();
    const hash = this.hash;
    const height = $(hash).offset().top;
    const navHeight = $('.navbar').outerHeight(true);
    const finalHeight = height - navHeight * 2;
    $('html, body').animate({
      scrollTop: finalHeight
    }, 600, function() {
      window.location.hash = hash;
    });
  });
});
