var Amigo = Amigo || {};

Amigo.clientInfosController = function () {
    this.localStorageKey = "amigo.client";
	
	this.$divResult = null;
	this.$clientNom = null;
	this.$clientNumero = null;
	this.$clientQuota = null;
	
    this.$clientInfosPage = null;
    this.clientInfosUpdatedPageId = null;
    this.$clientsPage = null;
    this.$btnRefresh = null;
    this.$bookingsListCtn = null;
    this.bookings = [];
};

Amigo.clientInfosController.prototype.init = function () {
	var me = this;
	//alert("init info");
    this.$clientInfosPage = $("#page-client-infos");
    this.clientInfosUpdatedPageId = "#page-client-updated-quota";
	this.$btnScan = $("#btn-scan-client", this.$clientInfosPage);
	this.$clientNom = $("#client-nom", this.$clientInfosPage);
	this.$clientNumero = $("#client-numero", this.$clientInfosPage);
	this.$clientQuota = $("#client-quota", this.$clientInfosPage);
	
	var infoClient = window.localStorage.getItem(this.localStorageKey);
	$.mobile.loading("show");
	$.ajax({
        type: 'GET',
        url: Amigo.Settings.apiGetClientInfoUrl,
        data: "info=" + infoClient,
		cache: false,
        success: function (resp) {

            $.mobile.loading("hide");

            if (resp.success === true) {
				me.$clientNom.html(resp.Nom);
				me.$clientNumero.html(resp.Numero);
				me.$clientQuota.html(resp.quota);
				window.localStorage.setItem("amigo.client.nom", resp.Nom);
				window.localStorage.setItem("amigo.client.numero", resp.Numero);
				window.localStorage.setItem("amigo.client.quota", resp.quota);
				window.localStorage.setItem("amigo.client.id", resp.ID);
                return;
            } else {
                //alert("success nest pas true");
            }
        },
        error: function (e) {
            $.mobile.loading("hide");
           
        }
    });
	
	//me.$divResult.html(infoClient);
    
};

Amigo.clientInfosController.prototype.resetInfos = function () {
	//alert("reset info");
    window.localStorage.removeItem("amigo.client.nom");
	window.localStorage.removeItem("amigo.client.numero");
	window.localStorage.removeItem("amigo.client.quota");
	window.localStorage.removeItem("amigo.client.id");
	this.$btnScan = $("#btn-scan-client", this.$clientInfosPage);
};

Amigo.clientInfosController.prototype.startScanSacQrCode = function () {
	
	var me = this,
		msg = 'Identifier le sac';
	
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
			window.localStorage.setItem('amigo.sac.id', s);
			$.mobile.navigate(me.clientInfosUpdatedPageId);
			
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