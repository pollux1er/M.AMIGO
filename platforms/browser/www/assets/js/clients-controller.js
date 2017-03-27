var Amigo = Amigo || {};

Amigo.clientsController = function () {
    this.localStorageKey = "amigo.clients";
    this.$clientsPage = null;
    this.$btnRefresh = null;
    this.$clientsListCtn = null;
    this.clients = []; // Tableau relatif aux clients
};

Amigo.clientsController.prototype.init = function () {
    this.$clientsPage = $("#page-clients");
    this.$btnRefresh = $("#btn-refresh", this.$clientsPage);
    this.$clientsListCtn = $("#clients-list-ctn", this.$clientsPage);
	//alert("init");
	//alert(this.localStorageAgentId);
	//this.showClientsFromServer();
    // For testing purposes only
    // window.localStorage.setItem(this.localStorageKey, JSON.stringify([{
        // Nom: 'Mami makala Laura',
        // Numero: '696458574',
        // Point: '28'
    // }, {
        // Nom: 'Maa Beigner',
        // Numero: '679524112',
        // Point: '5'
    // }, {
        // Nom: '8/27/2015 9:00 AM',
        // Numero: '8/27/2015 11:00 AM',
        // Point: 'HR Systems rollout'
    // }, {
        // Nom: '8/27/2015 9:00 AM',
        // Numero: '8/27/2015 11:00 AM',
        // Point: 'HR Systems rollout'
    // }]));
};

Amigo.clientsController.prototype.getClientsFromLocalStorage = function () {

    var result = [];

    try {
        result = JSON.parse(window.localStorage.getItem(this.localStorageKey)) || [];
    } catch (e) {
        result = [];
    }
	//alert("getClientsFromLocalStorage" + result);
    return result;
};

Amigo.clientsController.prototype.renderClients = function () {

    var ul,
        li,
        liArray = [],
        liString,
        view;

   this.$clientsListCtn.empty();

   if (this.clients.length === 0) {
       $("<p>Aucun client trouvé!</p>").appendTo(this.$clientsListCtn);
       return;
   }

   ul = $("<ul id=\"clients-list\" data-role=\"listview\"></ul>").appendTo(this.$clientsListCtn);

    for (i = 0; i < this.clients.length; i += 1) {

        client = this.clients[i];

        li = "<li><a><div class=\"bi-list-item-secondary\"><p>" + client.quota + "</p></div>" +
                    "<div class=\"bi-list-item-primary\">" + client.nom + "</div></a></li>";

        liArray.push(li);
    }

    liString = liArray.join("");
    $(liString).appendTo(ul);

    ul.listview();

};

Amigo.clientsController.prototype.showClientsFromServer = function () {
    // TODO: implement
    //throw "Not Implemented";
	var me = this;
	
    var id = window.localStorage.getItem("amigo.agent.id");
	var urlclients = "http://digex.tech/mccann/amigo/ajax/get_mamies/"+id;

    $.ajax({
        url: urlclients,
        data: "" // TODO: send session token.
    })
    .done(function (data,status,xhr) {
        // TODO: Save downloaded bookigns to local storage and render to DOM.
        window.localStorage.setItem(me.localStorageKey, JSON.stringify(data));
		})
    .fail(function (xhr,status,err) {
        // TODO: implement
		alert("Verifier votre connexion internet!");
    })
    .always(function (xhr,status) {
		me.showClients();
	  //alert("render");
    });
	
};

Amigo.clientsController.prototype.showClients = function () {
	
    this.clients = this.getClientsFromLocalStorage();

    // Retrieve from server if local storage empty and online (Add offline check).
    if (!this.clients || this.clients.length == 0) {
		//alert("va prendre sur le serveur");
		this.showClientsFromServer();  
    } else {
		//alert("affiche ce que tu as");
        this.renderClients();
    }  
};