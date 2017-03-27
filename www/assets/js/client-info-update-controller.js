var Amigo = Amigo || {};

Amigo.clientInfosUpdateController = function () {
    this.localStorageKey = "amigo.client";
    this.localStorageNomClient = "amigo.client.nom";
    this.localStorageNumeroClient = "amigo.client.numero";
    this.localStorageQuotaClient = "amigo.client.quota";
	
	this.dashboardPageId = null;
	
	this.$divResult = null;
	this.$clientQuota = null;
	
    this.$clientInfosUpdatedPage = null;
    this.client = [];
};

Amigo.clientInfosUpdateController.prototype.init = function () {
	var me = this,
		quota = Number(window.localStorage.getItem(this.localStorageQuotaClient));
	//alert(quota);
    this.$clientInfosUpdatedPage = $("#page-client-updated-quota");
    this.dashboardPageId = "#page-dashboard";
	this.$btnUpdateQuota = $("#btn-update-client-quota", this.$clientInfosUpdatedPage);
	this.$clientNom = $("#client-nom2", this.$clientInfosUpdatedPage);
	this.$clientNumero = $("#client-numero2", this.$clientInfosUpdatedPage);
	this.$clientQuota = $("#client-quota2", this.$clientInfosUpdatedPage);
	
	me.$clientNom.html(window.localStorage.getItem(this.localStorageNomClient));
	me.$clientNumero.html(window.localStorage.getItem(this.localStorageNumeroClient));
	me.$clientQuota.html(quota+1);
    
};

Amigo.clientInfosUpdateController.prototype.updateChangesOnServer = function () {
	
	var me = this,
		id_agent = window.localStorage.getItem("amigo.agent.id"),
		id_sac = window.localStorage.getItem('amigo.sac.id'),
		id_vendeuse = window.localStorage.getItem('amigo.client.id'),
		msg = "Très chère client, votre compte fidélité vient d'être mis à jour. La PASTA vous remercie pour votre fidélité.";
	// Update changes online ajax
	$.mobile.loading("show");
	$.ajax({
        type: 'GET',
        url: Amigo.Settings.apiSetClientSacInfoUrl,
        data: "id_vendeuse=" + id_vendeuse + "&id_sac=" + id_sac + "&id_agent=" + id_agent,
        success: function (resp) {

            //$.mobile.loading("hide");

            if (resp.success === true) {
				//alert("bravo");
                return;
            } else {
                //alert("success nest pas true");
            }
        },
        error: function (e) {
            $.mobile.loading("hide");
           
        }
    });
	//alert(me.msg);
	$.ajax({
        type: 'POST',
        url: Amigo.Settings.apiSendSmsToClient,
        data: "id_vendeuse=" + id_vendeuse + "&group=client&sms=" + "Très chère client, votre compte fidélité vient d'être mis à jour. La PASTA vous remercie pour votre fidélité.",
        success: function (resp) {

            //$.mobile.loading("hide");

            if (resp.success === true) {
				//alert("bravo");
                return;
            } else {
                //alert("success nest pas true");
            }
        },
        error: function (e) {
            $.mobile.loading("hide");
           
        }
    });
	
	// Go to main menu.
	window.localStorage.removeItem('amigo.sac.id');
    $.mobile.navigate(me.dashboardPageId);
	
};