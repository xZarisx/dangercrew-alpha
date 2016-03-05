import $ from 'jquery'

export function addKeyboardSinglePress(keyCode, handler, namespace ) {

    var namespacedKeydownEvent = "keydown." + (namespace || "");
    var namespacedKeyupEvent = "keyup." + (namespace || "");
    var keySafe = true;

    $(document).on(namespacedKeydownEvent, function(e) {
        switch(e.which) {
            case keyCode:
                e.preventDefault();
                if (keySafe) {
                    keySafe = false;
                    handler();
                }
                break;
        }
    });

    $(document).on(namespacedKeyupEvent, function(e) {
        switch(e.which) {
            case keyCode:
                keySafe = true;
                break;
        }
        e.preventDefault();
    });
}

export function removeKeyboardSinglePress(namespace) {
    if (!namespace) {
        console.warn('valid namespace string required for `removeKeyboardSinglePress`')
        return false;
    }

    $( document).off( '.'+namespace );
}