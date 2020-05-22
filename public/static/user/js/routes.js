//dont need react router is so non-light-weight
//ES5 only whitout BABEL
var routes = {
    ['signup']: 'static/user/js/signup.jsx',
    ['login']: 'static/user/js/login.jsx',
};
window.injectJS = function (url, successCB) {
    //Core impletation
    $.ajax({
        url: url, method: "GET", success: function (res) {
            var code = Babel.transform(res, { presets: [['es2015'], 'stage-0', 'react'] });
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

        function injectJS(hash, successCB) {

            //Core impletation
            $.ajax({
                url: routes[hash], method: "GET", success: function (res) {
                    var code = Babel.transform(res, { presets: [['es2015', { modules: false }], 'stage-2', 'react'] });
                    eval(code.code)
                }
            })
        }
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