//dont need react router is so non-light-weight
//ES5 only whitout BABEL
var routes = {
    ['']: 'static/user/js/login.jsx',
    ['home']: 'static/user/js/home.jsx'
};
; (function () {
        $(document).ready(ready)

        function ready() {

            function injectJS(hash, successCB) {
                //Core impletation
                $.ajax({
                    url: routes[hash], method: "GET", success: function (res) {
                        var code = Babel.transform(res, { presets: ['es2015', 'stage-2', 'react'] });
                        eval(code.code)
                    }
                })
            }
            function onHashchange() {
                let hash = this.location.hash.replace('#', '');
                injectJS(hash);
            }
            window.addEventListener('hashchange', onHashchange)
            onHashchange()
        }
    })();