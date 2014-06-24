/*
 *   Inverted Scroll - Version 1.0
 *   Author  : @jorge_maicon
 *   URL     : http://github.com/jorgemaicon/inverted-scroll/
 *   License : MIT License / GPL License
 */

;(function($){
    $.fn.invertedScroll = function() {
        var body   = $('html, body');
        var view   = $(window);
        var left   = $('.left');
        var right  = $('.right');
        var row    = $('.row');

        left.css('width', '50%');
    
        right.css({
            position : 'fixed',
            width    : '50%',
            right    : 0,
            bottom   : 0
        });

        row.css({
            height   : view.height(),
            width    : '100%',
            overflow : 'hidden'
        });

        view.scroll(function(){
            right.css('bottom', - (view.scrollTop()));
            scrollToNearestSection();
        });

        view.resize(function() {
            row.css('height', view.height());
            scrollToNearestSection();
        });

        function scrollToNearestSection() {
            clearTimeout($.data(this, 'timer'));
            $.data(this, 'timer', setTimeout(function() {
                var sections = left.find(row);
                for (var i = 0; i < sections.length; i++) {
                    if (view.scrollTop() > $(sections[i]).position().top && view.scrollTop() < (($(sections[i]).position().top) + (row.height() / 2))) {
                        body.stop().animate({scrollTop: $(sections[i]).offset().top});
                    } 

                    if (view.scrollTop() > $(sections[i]).position().top && view.scrollTop() > (($(sections[i]).position().top) + (row.height() / 2))) {
                        body.stop().animate({scrollTop: $(sections[i+1]).offset().top});
                    }
                }
            }, 250));
        }
    }
}(jQuery));