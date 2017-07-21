$(document).ready(function() {

    $('.inpage-nav').on('click', function(event) {
        event.preventDefault();
        var hash = this.hash; // either #map or #featured
        var height = $(hash).offset().top;
        var finalHeight = $(window).scrollTop() <= 150 ?
            height - 150 :  height - 100;
        $('html, body').animate({
            scrollTop: finalHeight
        }, 600, function() {
            window.location.hash = hash;
        });
    });

    $(window).on('scroll', function() {
        var height = 150;
        $(window).scrollTop() > height ? $('nav').addClass('goToTop') :
            $('nav').removeClass('goToTop');
    });
});
