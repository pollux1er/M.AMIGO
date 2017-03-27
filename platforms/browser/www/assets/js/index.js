var Amigo = Amigo || {};

// Begin boilerplate code generated with Cordova project.

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {

    }
};

app.initialize();

// End boilerplate code.

$(document).on("mobileinit", function (event, ui) {
    $.mobile.defaultPageTransition = "slide";
});

app.signInController = new Amigo.SignInController();
app.dashboardController = new Amigo.dashboardController();
app.clientsController = new Amigo.clientsController();
app.clientInfosController = new Amigo.clientInfosController();
app.clientInfosUpdateController = new Amigo.clientInfosUpdateController();

$(document).on("pagecontainerbeforeshow", function (event, ui) {
    if (typeof ui.toPage == "object") {
        switch (ui.toPage.attr("id")) {
            case "page-dashboard":
                // Reset the signup form.
                app.dashboardController.init();
                break;
            case "page-signin":
                // Reset signin form.
				app.signInController.resetSignInForm();
                break;
			case "page-client-infos":
                // Reset signin form.
				app.clientInfosController.init();
                break;
			case "page-client-updated-quota":
                // Reset signin form.
				app.clientInfosUpdateController.init();
                break;
            case "page-clients":
                // Show  the list of bookings.
                app.clientsController.showClients();
                break;
        }
    }
});

$(document).on("pagecontainerbeforechange", function (event, ui) {

    if (typeof ui.toPage !== "object") return;
    
    switch (ui.toPage.attr("id")) {
        case "page-signin":
            if (!ui.prevPage) {
                // Check session.keepSignedIn and redirect to main menu.
                var session = Amigo.Session.getInstance().get(),
                    today = new Date();
                if (session && session.keepSignedIn && new Date(session.expirationDate).getTime() > today.getTime()) {
                    ui.toPage = $("#page-dashboard");
                }
            }
    }
});

$(document).delegate("#page-signin", "pagebeforecreate", function () {
	app.signInController.init();

    app.signInController.$btnSubmit.off("tap").on("tap", function () {
		app.signInController.onSignInCommand();
    });
});

$(document).delegate("#page-clients", "pagebeforecreate", function () {
	app.clientsController.init();

    /*app.clientsController.$btnSubmit.off("tap").on("tap", function () {
		app.signInController.onSignInCommand();
    });*/
});

$(document).delegate("#page-client-infos", "pagebeforecreate", function () {
	app.clientInfosController.resetInfos();

    app.clientInfosController.$btnScan.off("tap").on("tap", function () {
		app.clientInfosController.startScanSacQrCode();
    });
});

$(document).delegate("#page-client-updated-quota", "pagebeforecreate", function () {
	app.clientInfosUpdateController.init();

    app.clientInfosUpdateController.$btnUpdateQuota.off("tap").on("tap", function () {
		app.clientInfosUpdateController.updateChangesOnServer();
    });
});

$(document).delegate("#page-dashboard", "pagebeforecreate", function () {
	app.dashboardController.init();
	
	app.dashboardController.$btnClients.off("tap").on("tap", function () {
		//alert("Button clients");
		app.dashboardController.openClientsList();
    });
	
	app.dashboardController.$btnScan.off("tap").on("tap", function () {
		//alert("Open Scanner");
		app.dashboardController.startScanClientQrCode();
		//document.querySelector("#startScan").addEventListener("touchend", startScan, false);
		//resultDiv = document.querySelector("#results");
    });
	
	app.dashboardController.$btnLogout.off("tap").on("tap", function () {
		//alert("Logout");
		Amigo.Session.getInstance().destroy();
		//app.dashboardController.logoff();
    });
    
});
