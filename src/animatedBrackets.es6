/*

 animatedBrackets

 Author: lemehovskiy

 */

(function ($) {

    $.fn.animatedBrackets = function (options) {

        let settings = $.extend({
            points: [
                '0 20, 0 0, 100 0, 100 20',
                '100 80, 100 100, 0 100, 0 80'
            ],
            color: '#ffffff',
            stroke_width: 10,
            duration: 1,
            delay: 1
        }, options);


        $(this).each(function () {

            let $this = $(this),
                $this_width = 0,
                $this_height = 0,

                brackets_config = [],

                is_inited = false,
                is_animated = false,

                svgElement = $(document.createElementNS("http://www.w3.org/2000/svg", "svg")),

                timeline = new TimelineLite();

            //generate brackets config
            settings.points.forEach(function (points_str) {

                let brackets_points = points_str.split(', ');

                let bracket_points_arr = [];

                brackets_points.forEach(function (item) {

                    bracket_points_arr.push(item.split(' '));

                });

                brackets_config.push({points: bracket_points_arr});
            });

            $this.append(svgElement);

            $this.css({
                position: 'relative'
            });

            svgElement.css({
                width: '100%',
                height: '100%',
                position: 'absolute',
                left: 0,
                top: 0,
                overflow: 'visible'
            });


            brackets_config.forEach(function (bracket) {

                bracket.element = $(document.createElementNS("http://www.w3.org/2000/svg", 'polyline'));

                svgElement.append(bracket.element);

            });

            $(window).on('load resize', function () {
                $this_width = $this.outerWidth();
                $this_height = $this.outerHeight();

                draw_brackets();
            });

            $(window).on('load scroll resize', function () {

                if (is_inited && $this.isOnScreen(.5, .5) && !is_animated) {
                    animate_brackets();
                    is_animated = true;
                }

            });


            function animate_brackets() {
                timeline.staggerTo($this.find('polyline'), settings.duration, {attr: {'stroke-dashoffset': 0}}, settings.delay);
            }

            function draw_brackets() {

                brackets_config.forEach(function (bracket) {

                    draw_polyline({
                        element: bracket.element,
                        points: bracket.points,
                        element_width: $this_width,
                        element_height: $this_height,
                        color: settings.color,
                        stroke_width: settings.stroke_width
                    });

                    if (!is_animated){
                        set_dash({
                            element: bracket.element,
                        });
                    }

                });

                is_inited = true;

            }

            function set_dash(settings){

                let element = settings.element;

                element.attr("stroke-dasharray", element.get(0).getTotalLength());
                element.attr("stroke-dashoffset", element.get(0).getTotalLength());
            }

        });


        function draw_polyline(settings) {

            let element = settings.element;

            let points = settings.points;

            let points_str = '';

            points.forEach(function (item) {
                points_str += settings.element_width / 100 * item[0] + ", " + settings.element_height / 100 * item[1] + " "
            });

            element.attr("points", points_str);

            element.attr("style", "stroke:"+settings.color+"; stroke-width:" + settings.stroke_width + "; fill:none"); //Set path's data



        }

    };

    $.fn.isOnScreen = function (x, y) {

        if (x == null || typeof x == 'undefined') x = 1;
        if (y == null || typeof y == 'undefined') y = 1;

        var win = $(window);

        var viewport = {
            top: win.scrollTop(),
            left: win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var height = this.outerHeight();
        var width = this.outerWidth();

        if (!width || !height) {
            return false;
        }

        var bounds = this.offset();
        bounds.right = bounds.left + width;
        bounds.bottom = bounds.top + height;

        var visible = (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

        if (!visible) {
            return false;
        }

        var deltas = {
            top: Math.min(1, ( bounds.bottom - viewport.top ) / height),
            bottom: Math.min(1, ( viewport.bottom - bounds.top ) / height),
            left: Math.min(1, ( bounds.right - viewport.left ) / width),
            right: Math.min(1, ( viewport.right - bounds.left ) / width)
        };

        return (deltas.left * deltas.right) >= x && (deltas.top * deltas.bottom) >= y;

    };

})(jQuery);