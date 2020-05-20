//dont need react router is so non-light-weight
//ES5 only whitout BABEL
var routes = {
    ['profile']: 'static/user/js/home.jsx',
    ['signup']: 'static/user/js/signup.jsx',
    ['login']: 'static/user/js/login.jsx',
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
                //fix bugs
                if(!routes[hash]){
                    return
                }
                injectJS(hash);
            }
            window.addEventListener('hashchange', onHashchange)
            onHashchange()
        }
    })();