import store from '../init/store';

export default function() {

    const acceptedSizes = [
        352, 528, 704, 880, 1056, 1232, 1408, 1584
    ];

    var CELL;
    var setViewport = function(width) {

        var limit = acceptedSizes[acceptedSizes.length-1];
        width = (width <= limit ) ? width : limit;

        const widthMatch = acceptedSizes.indexOf(width);
        if (widthMatch != -1) {

            var height = (7/11) * width;

            /* Quick fix 3/19: Check if height is acceptable. If not, use one setting down */
            if ($(window).height() < height) {
                //Use one setting down.
                if (widthMatch > 0) {
                    width = acceptedSizes[widthMatch-1];
                    height = (7/11) * width;
                }

            }


            store.dispatch({
                type: "SET_VIEWPORT_SIZE",
                width: width,
                height: height
            });

            return;

        } else {
            //recursively try to find 11
            if (width > 11) {
                setViewport(width - 1);
            } else {
                console.warn('couldnt set viewport width :(')
            }
        }
    };

    var resizeTimeout;
    window.onresize = function () {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(function () {
            setViewport( $(window).width() );
        }, 50);
    };
    setViewport( $(window).width() );

}