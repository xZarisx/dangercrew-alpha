import resizer from '../viewport/resizer';

export default function() {
    /* Do some miscellanious things for the browser */

    /* Listen for window resizing */
    resizer();

    //Hide context menus in Chrome dev
    window.addEventListener("contextmenu", function(e) { e.preventDefault(); })
}