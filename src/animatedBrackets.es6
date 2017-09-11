/*

 animatedBrackets

 Author: lemehovskiy

 */

(function ($) {

    $.fn.animatedBrackets = function (options) {

        let settings = $.extend({
            ratio_x: 16,
            ratio_y: 9
        }, options);


        $(this).each(function () {


            let $this = $(this);

            let $this_width = $this.outerWidth();
            let $this_height = Math.round($this.outerHeight());

            let bracket_height = 50;
            let stroke_width = 5;

            let top_bracket, bottom_bracket;

            console.log($this_width);


            let svgElement = $(document.createElementNS("http://www.w3.org/2000/svg", "svg"));


            $this.append(svgElement);

            $this.css({
                position: 'relative'
            })

            svgElement.css({
                width: '100%',
                height: '100%',
                position: 'absolute',
                left: 0,
                top: 0,
                overflow: 'visible'
            })


            top_bracket = document.createElementNS("http://www.w3.org/2000/svg", 'polyline'); //Create a path in SVG's namespace
            bottom_bracket = document.createElementNS("http://www.w3.org/2000/svg", 'polyline'); //Create a path in SVG's namespace

            draw_brackets();


            $(window).on('load resize', function(){
                $this_width = $this.outerWidth();
                $this_height = Math.round($this.outerHeight());

                draw_brackets();

            })

            function draw_brackets() {


                top_bracket = draw_polyline({
                    element: top_bracket,
                    stroke_width: stroke_width,
                    points: [
                        {
                            x: 0,
                            y: bracket_height
                        },
                        {
                            x: 0,
                            y: 0
                        },
                        {
                            x: $this_width,
                            y: 0
                        },
                        {
                            x: $this_width,
                            y: bracket_height
                        }

                    ]
                });

                bottom_bracket = draw_polyline({
                    element: bottom_bracket,
                    stroke_width: stroke_width,
                    points: [
                        {
                            x: 0,
                            y: $this_height - bracket_height
                        },
                        {
                            x: 0,
                            y: $this_height
                        },
                        {
                            x: $this_width,
                            y: $this_height
                        },
                        {
                            x: $this_width,
                            y: $this_height - bracket_height
                        }

                    ]
                });

            }

            svgElement.append(top_bracket);
            svgElement.append(bottom_bracket);

        });


        function draw_polyline(settings) {


            let element = settings.element;

            let points = settings.points;

            let points_str = '';

            points.forEach(function (item) {
                points_str += item.x + ", " + item.y + " "
            });

            element.setAttribute("points", points_str);

            element.setAttribute("style", "stroke:red; stroke-width:" + settings.stroke_width + "; fill:none"); //Set path's data

            return element;
        }


    };

})(jQuery);