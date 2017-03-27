var Amigo = Amigo || {};

Amigo.dashboardController = function () {
    this.localStorageKey = "amigo.client";
	this.localStorageNomClient = "amigo.client.nom";
	this.localStorageNumeroClient = "amigo.client.numero";
	this.localStorageQuotaClient = "amigo.client.quota";
	this.localStorageIdClient = "amigo.client.id";
	
	this.signinPageId = null;
    this.$clientsPageId = null;
    this.$clientInfosPageId = null;
    this.$divResult = null;
    this.$dashboardPage = null;
    this.$bookingsListCtn = null;
    this.bookings = [];
};

Amigo.dashboardController.prototype.init = function () {
    this.$dashboardPage = $("#page-dashboard");
	
    this.clientsPageId = "#page-clients";
    this.clientInfosPageId = "#page-client-infos";
    this.signinPageId = "#page-signin";
    this.$btnScan = $("#btn-scan", this.$dashboardPage);
    this.$divResult = $("#results", this.$dashboardPage);
    this.$btnClients = $("#btn-clients", this.$dashboardPage);
    this.$btnLogout = $("#span-logout", this.$dashboardPage);
	
	window.localStorage.removeItem(this.localStorageKey); // 
	window.localStorage.removeItem(this.localStorageNomClient);
	window.localStorage.removeItem(this.localStorageNumeroClient);
	window.localStorage.removeItem(this.localStorageQuotaClient);
	window.localStorage.removeItem(this.localStorageIdClient);

    // For testing purposes only
	/*
    window.localStorage.setItem(this.localStorageKey, JSON.stringify([{
        dateTimeFrom: '8/27/2015 9:00 AM',
        dateTimeTo: '8/27/2015 11:00 AM',
        description: 'HR Systems rollout'
    }, {
        dateTimeFrom: '8/27/2015 3:00 PM',
        dateTimeTo: '8/27/2015 3:30 PM',
        description: 'Business Intelligence Training'
    }, {
        dateTimeFrom: '8/28/2015 11:00 AM',
        dateTimeTo: '8/28/2015 11:30 AM',
        description: 'Development team status check'
    }, {
        dateTimeFrom: '8/28/2015 2:00 PM',
        dateTimeTo: '8/28/2015 4:30 PM',
        description: 'Information Security Awareness Training'
    }]));*/
};

Amigo.dashboardController.prototype.openClientsList = function () {
	
	//alert("dans openClientsList");
    var me = this;
	
	$.mobile.loading("show");
	
	$.mobile.navigate(me.clientsPageId);	
	
	$.mobile.loading("hide");
	
};
/*
Amigo.dashboardController.prototype.startScan = function () {
	cordova.plugins.barcodeScanner.scan(
		function (result) {
			var s = "Result: " + result.text + "<br/>" +
			"Format: " + result.format + "<br/>" +
			"Cancelled: " + result.cancelled;
			resultDiv.innerHTML = s;
		},
		function (error) {
			alert("Scanning failed: " + error);
		},
		{
			preferFrontCamera : false, // iOS and Android
			showFlipCameraButton : true, // iOS and Android
			showTorchButton : false, // iOS and Android
			torchOn: false, // Android, launch with the torch switched on (if available)
			prompt : "Identifier le client avec son Qr Code", // Android
			resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
			formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
			orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
			disableAnimations : true, // iOS
			disableSuccessBeep: false // iOS
		}
	);
}
*/
Amigo.dashboardController.prototype.startScanClientQrCode = function () {
	
	//alert("dans startScanClientQrCode");
	
	var me = this,
		msg = 'Identifier le client';
	
	cordova.plugins.barcodeScanner.scan(
		function (result) {
			var s = result.text; /*+ "<br/>" +
			"Format: " + result.format + "<br/>" +
			"Cancelled: " + result.cancelled;*/
			//resultDiv.innerHTML = s;
			//me.$divResult.html(s);
			// Amigo.Session.getInstance().set({
	            // infoClient: s
			// });
			window.localStorage.setItem('amigo.client', s);
			$.mobile.navigate(me.clientInfosPageId);
		},
		function (error) {
			alert("Scanning failed: " + error);
		},
		{
			preferFrontCamera : false, // iOS and Android
			showFlipCameraButton : true, // iOS and Android
			showTorchButton : false, // iOS and Android
			torchOn: false, // Android, launch with the torch switched on (if available)
			prompt : me.msg, // Android
			resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
			formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
			orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
			disableAnimations : true, // iOS
			disableSuccessBeep: false // iOS
		}
	);
	
};

Amigo.dashboardController.prototype.logoff = function () {
    // if (this.session.userProfileModel) 
		// delete this.session.userProfileModel;
	window.localStorage.removeItem("amigo.client.id");
	window.localStorage.removeItem("amigo.client.nom");
	window.localStorage.removeItem("amigo.client.numero");
	window.localStorage.removeItem("amigo.client.quota");
	window.localStorage.removeItem('amigo.sac.id');
	$.mobile.navigate(me.signinPageId);
    return;
};