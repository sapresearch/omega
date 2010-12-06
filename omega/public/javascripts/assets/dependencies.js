/**
 * Singleton Pattern !
 * Queue mechanism to prevent methods  being invoked without having their dependecies loaded
 */

Queue = function() {
    var function_stack = [];
    return {
        count : 0,
        add : function(f) {
            if (this.count == 0)
            {
                f();
            }
            else
            {
                function_stack.push(f);
            }
        },
        invoke : function() {

                while (function_stack.length > 0) {

                    // invoke and pop
                    (function_stack.shift())();
                }


        }
    }
}();


function _already_required(source, tagName, typeAttribute, type) {
    var elements = document.getElementsByTagName(tagName), i = 0, len = 0;

    for (i = 0,len = elements.length; i < len; i++) {
        var element = elements[i];
        if (element.getAttribute('type') == type && element.getAttribute(typeAttribute) == source) {
            return true;
        }
    }

    return false;
}

function _already_required_stylesheet(source) {
    return _already_required(source, 'link', 'href', 'text/css');
}

function _already_required_javascript(source) {
    return _already_required(source, 'script', 'src', 'text/javascript');
}

function require_stylesheet(source) {
    if (_already_required_stylesheet(source)) return;

    var link = document.createElement('link');
    link.setAttribute('type', 'text/css');
    link.setAttribute('ref', 'stylesheet');
    link.setAttribute('media', 'screen');
    link.setAttribute('href', source);

    document.getElementsByTagName('head')[0].appendChild(link);
}

function require_javascript(source) {
    if (_already_required_javascript(source)) return;

    Queue.count++;

    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', source);


    document.getElementsByTagName('head')[0].appendChild(script);


    script.onreadystatechange = function () {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {

            Queue.count--;
            // check if we have somehting left on the stack
            if (Queue.count == 0) {
                Queue.invoke()
            }
        }
    };
    // test for onload to trigger callback
    script.onload = function () {

        Queue.count--;
        // check if we have somehting left on the stack
        if (Queue.count == 0) {
            Queue.invoke()
        }

    };
    // safari doesn't support either onload or readystate, create a timer
    // only way to do this in safari
    // that approach is not wroking anylonger since tha pattern below is also matching google's chrome
//    if (/Safari/i.test(navigator.userAgent)) { //Test for Safari
//        var _timer = setInterval(function() {
//            if (/loaded|complete/.test(document.readyState)) {
//                clearInterval(_timer)
//                Queue.count--;
//                if (Queue.count == 0) {
//                    Queue.invoke()
//                }
//            }
//        }, 10)
//    }

}



