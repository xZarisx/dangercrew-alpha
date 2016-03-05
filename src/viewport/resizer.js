import store from '../init/store';

export default function() {

    const acceptedSizes = [
        352, 528, 704, 880, 1056, 1232, 1408, 1584
    ];

    var CELL;
    var setViewport = function(width) {

        var limit = acceptedSizes[acceptedSizes.length-1];
        width = (width <= limit ) ? width : limit;

        if (acceptedSizes.indexOf(width) != -1) {
            var height = (7/11) * width;

            store.dispatch({
                type: "SET_VIEWPORT_SIZE",
                width: width,
                height: height
            })

            return;

        } else {
            //recursively try to find 11
            setViewport(width - 1);
        }
    };

    var resizeTimeout;
    window.onresize = function () {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(function () {
            setViewport( window.outerWidth );
        }, 100);
    };
    setViewport( window.outerWidth );

}