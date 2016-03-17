/*http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript*/

export default function() {
    return 'ontouchstart' in window  // works on most browsers
        || navigator.maxTouchPoints; // works on IE10/11 and Surface
};