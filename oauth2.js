async function introspectAccessToken(r) {
    var authHeader = "";
    if (r.variables.oauth_client_id.length) {
        var basicAuthPlaintext = r.variables.oauth_client_id + ":" + r.variables.oauth_client_secret;
        authHeader = "Basic " + basicAuthPlaintext.toBytes().toString('base64');    
    } else {
        authHeader = "Bearer " + r.variables.oauth_client_secret;
    }

    var token = r.headersIn.apikey;
    // var token = r.variables.apikey;
    r.log("OAuth sending introspection request with token: " + token)
    await r.subrequest("/_oauth2_send_request", "token=" + token + "&authorization=" + authHeader,
        function(reply) {
            r.log("OAuth token introspection response: " + reply.responseBody)
            if (reply.status == 200) {
                var response = JSON.parse(reply.responseBody);
                r.log(response.active);
                if (response.active == true) {
                    r.return(204); // Token is valid, return success code
                } else {
                    r.return(403); // Token is invalid, return forbidden code
                }
            } else {
                r.return(401); // Unexpected response, return 'auth required'
            }
        }
    );
}

export default { introspectAccessToken }