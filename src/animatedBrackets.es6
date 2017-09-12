/*

 animatedBrackets

 Author: lemehovskiy

 */

(function ($) {

    $.fn.animatedBrackets = function (options) {

        let settings = $.extend({
            start_side: 'left',
            points: [
                '0 20, 0 0, 100 0, 100 20',
                '100 80, 100 100, 0 100, 0 80'
            ]
        }, options);


        let brackets_config = [];

        //generate brackets config
        settings.points.forEach(function(points_str){

            let brackets_points = points_str.split(', ');

            let bracket_points_arr = [];

            brackets_points.forEach(function (item) {

                bracket_points_arr.push(item.split(' '));

            });

            brackets_config.push({points: bracket_points_arr});
        });


        $(this).each(function () {

            let $this = $(this),
                $this_width = 0,
                $this_height = 0,

                stroke_width = 5,

                svgElement = $(document.createElementNS("http://www.w3.org/2000/svg", "svg"));

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


            brackets_config.forEach(function(bracket){

                bracket.element = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');

                svgElement.append(bracket.element);

            });

            $(window).on('load resize', function () {
                $this_width = $this.outerWidth();
                $this_height = $this.outerHeight();

                draw_brackets();

            });


            function draw_brackets() {

                brackets_config.forEach(function(bracket){

                    draw_polyline({
                        element: bracket.element,
                        stroke_width: stroke_width,
                        points: bracket.points,
                        element_width: $this_width,
                        element_height: $this_height,
                    })

                });

            }

        });


        function draw_polyline(settings) {

            let element = settings.element;

            let points = settings.points;

            let points_str = '';

            points.forEach(function (item) {
                points_str += settings.element_width / 100 * item[0] + ", " + settings.element_height / 100 * item[1] + " "
            });

            element.setAttribute("points", points_str);

            element.setAttribute("style", "stroke:red; stroke-width:" + settings.stroke_width + "; fill:none"); //Set path's data

            return element;
        }


    };

})(jQuery);