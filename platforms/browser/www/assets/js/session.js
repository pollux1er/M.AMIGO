var Amigo = Amigo || {};

Amigo.Session = (function () {
    var instance;

    function init() {

        var sessionIdKey = "amigo-session";
		

        return {
            // Public methods and variables.
            set: function (sessionData) {
                window.localStorage.setItem(sessionIdKey, JSON.stringify(sessionData));
            },

            get: function () {

                var result = null;

                try {
                    result = JSON.parse(window.localStorage.getItem(sessionIdKey));
                } catch(e){}

                return result;
            },
			
			destroy: function () {
				window.localStorage.removeItem(sessionIdKey);
				
				
			}
        };
    };

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
}());