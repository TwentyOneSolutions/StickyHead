;(function($, window, undefined) {

    /* jQuery plugin */
    $.fn.stickyHead = function() {

        return this.each(function(ix, el) {
            var $table = $(this),
                $theadf;

            function init() {

                if ($table.parents(".sticky-head-container").length)
                    return; //  already initialized

                $table.wrap('<div class="sticky-head-container"/>');

                $theadf = $table.clone();
                $theadf
                    .find("tbody")
                    .remove()
                    .end()
                    .addClass("sticky-head-fixed")
                    .css("margin-top", 0)
                    .insertBefore($table);
                onResize();

                $theadf.data("origTable", $table); // keep reference to the original table so we can test if it's visible
            }

            function onResize() {

                if (!$theadf) return;

                $theadf.find("th").each(function(ix) {
                    $(this).css("width", $table.find("th").eq(ix).outerWidth() + "px");
                });
            }

            function onScroll() {

                if (!$theadf) return;

                var offset = $(this).scrollTop();
                var tableOffsetTop = $table.offset().top;
                var tableOffsetBottom = tableOffsetTop + $table.height() - $table.find("thead").height();

                // hide this header if the original table is not visible or if the offsets are outside the scope of the table
                if (isHidden($theadf.data("origTable")) || offset < tableOffsetTop || offset > tableOffsetBottom)
                    $theadf.hide();
                else if (offset >= tableOffsetTop && offset <= tableOffsetBottom && $theadf.is(":hidden"))
                    $theadf.show();
            }

            $(window).resize(onResize);
            $(window).scroll(onScroll);
            init();
        });
    };

    addStyle("table.sticky-head-fixed { top: 0; position: fixed; width: auto; display: none; border: none; }");

    /* helper method to detect whether the table is hidden or in a collapsed container */
    function isHidden(element) {

        var $element = $(element).filter(':visible');

        if (!$element)
            return true;

        if ($element.parents().toArray().some(
                function(el) {
                    var $e = $(el);
                    return $e.width() * $e.height() === 0;
                }))
            return true; // if any of the parents has 0 width or height

        return false; // the element is visible
    };

    /* helper method to add css style */
    function addStyle(style) {

        var target = $("head");

        if (target.length == 0)
            target = $("body");

        $('<style>' + style + '</style>').appendTo(target);
    }

})(jQuery, window);
