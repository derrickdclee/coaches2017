
$(document).ready(function() {
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
