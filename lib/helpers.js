module.exports = function (app) {
    var module = {};

    module.mustBeLoggedIn = function (req, res) { //TODO: combine. param bool for is_signed_in, param for redirection - otherwise just return bool
    	if(req.cookies.email == undefined) {
    		res.redirect("/"); //tell them to sign in
    	}
    };
    module.mustBeLoggedOut = function (req, res) {
    	if(req.cookies.email != undefined) {
    		res.redirect("/feed");
    	}
    };

    return module;
};