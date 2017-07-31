
$(document).ready(function() {
  let topOfLogo = $('.logo').offset().top;
  let heightOfLogo = $('.logo').outerHeight(true);

  $(window).on('resize', function() {
    topOfLogo = $('.logo').offset().top;
    heightOfLogo = $('.logo').outerHeight(true);
  })
  $(window).on('scroll', function() {
    $(window).scrollTop() > topOfLogo + heightOfLogo ? $('nav').addClass('goToTop') :
        $('nav').removeClass('goToTop');
  });
});
