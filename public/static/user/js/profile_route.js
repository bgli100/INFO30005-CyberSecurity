//dont need react router is so non-light-weight
//ES5 only whitout BABEL
var routes = {
    ['']: '/static/user/js/home.jsx',
};
window.injectJS = function (url, successCB) {
    //Core impletation
    $.ajax({
        url: url, method: "GET", success: function (res) {
            var code = Babel.transform(res, { presets: [['es2016'], 'stage-0', 'react'] });
            successCB(code.code)

        }
    })
}

window.loadJSX = function (arr, callback) {
    let tmp = arr;
    let len = arr.length
    let curLen = 0
    let codeArr = []
    while (tmp.length > 0) {
        window.injectJS(tmp.shift(), function (code) {
            var index = curLen;
            codeArr[index] = code
            curLen++
            if (curLen >= len) {
                callback(codeArr)
            }
        })
    }
}
    ; (function () {
        $(document).ready(ready)

        function ready() {

            function onHashchange() {
                let hash = window.location.hash.replace('#', '');
                //fix bugs
                if (!routes[hash]) {
                    return
                }
                window.injectJS(routes[hash], function (code) {
                    eval(code)
                });
            }
            window.addEventListener('hashchange', onHashchange)
            onHashchange()
        }
    })();