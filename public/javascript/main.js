
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
});
