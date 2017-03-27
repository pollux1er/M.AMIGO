var Amigo = Amigo || {};
Amigo.Settings = Amigo.Settings || {};
Amigo.Settings.signInUrl = "http://digex.tech/mccann/amigo/api/api-login-agent.php"; 
Amigo.Settings.apiGetClientInfoUrl = "http://digex.tech/mccann/amigo/api/api-get-client-infos.php"; 
Amigo.Settings.apiSetClientSacInfoUrl = "http://digex.tech/mccann/amigo/api/api-credit-client-quota.php"; 
Amigo.Settings.apiSendSmsToClient = "http://digex.tech/mccann/amigo/ajax/send_sms_mamie/"; // uniquement en POST (group=client, id_vendeuse, sms) 
// Amigo.Settings.apiSendSmsToClient = "http://localhost/mccann/amigo/ajax/send_sms_mamie/"; // uniquement en POST (group=client, id_vendeuse, sms) 
// Amigo.Settings.apiGetClientInfoUrl = "http://localhost/mccann/amigo/api/api-get-client-infos.php"; 
// Amigo.Settings.apiSetClientSacInfoUrl = "http://localhost/mccann/amigo/api/api-credit-client-quota.php"; 
// Amigo.Settings.signInUrl = "http://localhost/mccann/amigo/api/api-login-agent.php"; //"http://192.168.1.104:30000/api/account/logon"; //
Amigo.Settings.dashboardUrl = "dash.html"; 
Amigo.Settings.sessionIdKey = "Amigo-session";
Amigo.Settings.sessionTimeoutInMSec = 86400000 * 30;   // 30 days.