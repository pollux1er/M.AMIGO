var Amigo = Amigo || {};

Amigo.SignInController = function () {

    this.$signInPage = null;
    this.dashboardPageId = null;
    this.$btnSubmit = null;
    this.$ctnErr = null;
    this.$txtNumero = null;
    this.$txtPassword = null;
    this.$chkKeepSignedIn = null;
};

Amigo.SignInController.prototype.init = function () {
	this.$signInPage = $("#page-signin");
    this.dashboardPageId = "#page-dashboard";
    this.$btnSubmit = $("#btn-submit", this.$signInPage);
    this.$ctnErr = $("#ctn-err", this.$signInPage);
    this.$txtNumero = $("#username", this.$signInPage);
    this.$txtPassword = $("#txt-password", this.$signInPage);
    this.$chkKeepSignedIn = $("#chk-keep-signed-in", this.$signInPage);
};

Amigo.SignInController.prototype.resetSignInForm = function () {
	
    var invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";

    this.$ctnErr.html("");
    this.$ctnErr.removeClass().addClass(invisibleStyle);
    this.$txtPassword.removeClass(invalidInputStyle);
    this.$txtPassword.val("");
    this.$chkKeepSignedIn.prop("checked", false);

};

Amigo.SignInController.prototype.onSignInCommand = function () {
	
    var me = this,
		numero = me.$txtNumero.val().trim(),
        password = me.$txtPassword.val().trim(),
        invalidInput = false,
        invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";

    // Reset styles.
    me.$ctnErr.removeClass().addClass(invisibleStyle);
	me.$txtNumero.removeClass(invalidInputStyle);
    me.$txtPassword.removeClass(invalidInputStyle);
	
	if (numero.length === 0) {
        me.$txtNumero.addClass(invalidInputStyle);
        invalidInput = true;
    }
	
    // Flag each invalid field.
   if (password.length === 0) {
        me.$txtPassword.addClass(invalidInputStyle);
        invalidInput = true;
    }

    // Make sure that all the required fields have values.
    if (invalidInput) {
        me.$ctnErr.html("<p>S'il vous plait veuillez remplir tous vos identifiants.</p>");
        me.$ctnErr.addClass("bi-ctn-err").slideDown();
        return;
    }

    $.mobile.loading("show");

    $.ajax({
        type: 'POST',
        url: Amigo.Settings.signInUrl,
        data: "numero=" + numero + "&password=" + password,
        success: function (resp) {

            $.mobile.loading("hide");

            if (resp.success === true) {
				
                // Create session. 
                var today = new Date();
                var expirationDate = new Date();
                expirationDate.setTime(today.getTime() + Amigo.Settings.sessionTimeoutInMSec);

                Amigo.Session.getInstance().set({
                    userProfileModel: resp.extras.userProfileModel,
                    sessionId: resp.sessionId,
                    expirationDate: expirationDate,
                    keepSignedIn:me.$chkKeepSignedIn.is(":checked")					
                });
				window.localStorage.setItem("amigo.agent.id", resp.extras.userProfileModel.id);
                // Go to main menu.
                $.mobile.navigate(me.dashboardPageId);
                return;
            } else {
                if (resp.extras.msg) {
                    switch (resp.extras.msg) {
                        case Amigo.ApiMessages.DB_ERROR:
                        // TODO: Use a friendlier error message below.
                            me.$ctnErr.html("<p>Oops! Amigo a eu un problème et n'a pas réussi à vous identifier.  Rapprochez vous d'un administrateur s.v.p.</p>");
                            me.$ctnErr.addClass("bi-ctn-err").slideDown();
                            break;
                        case Amigo.ApiMessages.INVALID_PWD:
                        case Amigo.ApiMessages.EMAIL_NOT_FOUND:
                            me.$ctnErr.html("<p>You entered a wrong username or password.  Please try again.</p>");
                            me.$ctnErr.addClass("bi-ctn-err").slideDown();
                            break;
                    }
                }
            }
        },
        error: function (e) {
            $.mobile.loading("hide");
           // console.log(e.message);
            // TODO: Use a friendlier error message below.
            me.$ctnErr.html("<p>Oops! Amigo a eu un problème et ne peut pas vous authentifier.  Reessayer dans quelques minutes s'il vous plait.</p>");
            me.$ctnErr.addClass("bi-ctn-err").slideDown();
        }
    });
};