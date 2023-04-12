# NGINX Plus OAuth Demos

Demonstrate NGINX Plus OAuth capabilities.

This demo will deploy Keycloak and NGINX Plus via Docker.

## Requirements

1. [Docker](https://www.docker.com/) or [Podman](https://podman.io/)
1. [NGINX Plus](https://www.nginx.com/free-trial-request/) repository certificate and key
1. [Postman](https://www.postman.com/) (for testing)

## Keycloak

For this demo, we will leverage the Bitnami Postgres and Keycloak images. Information about the default credentials can be found [here](https://hub.docker.com/r/bitnami/keycloak).

The configuration of Keycloak is based on the [NMS Tutorial](https://docs.nginx.com/nginx-management-suite/acm/tutorials/introspection-keycloak/).  Reference this guide for additional details regarding the configuration.

### Create a Realm

1. In the left navigation bar, click the drop-down menu that says `master`, then click the `Create Realm` button.
1. Set the `Realm name` to `nginx`.
1. Click the `Create` button.


### Create a User

1. In the left navigation bar, select `Users`, then click the `Create new user` button.
1. Set the username to `nginx-user`, the click the `Create` button.
1. Select the `Credentials` tab in the top menu, then click the `Set password` button.
1. Enter a password and turn off the `Temporary` toggle, the click the `Save` button and the `Save password` button.

### Configure a Client

1. In the left navigation bar, select `Clients`, then click the `Create client` button.
1. Enter `nginx-plus` for the `Client ID`, then click the `Next` button.
1. Toggle the `Client authentication` to `On`, then click the `Next` button.
1. Click the `Save` button.
1. Select the `Credentials` tab in the top menu and copy the `Client secret`.

### Configure a Custom Role

1. In the left navigation bar, select `Realm roles` and click the `Create role` button.
1. Enter `nginx-keycloak-role` for the `Role name`, then click the `Save` button.
1. Select `Users` in the left navigation bar, the click on the `nginx-user`.
1. Select the `Role mapping` tab in the top menu and click the `Assign role` button.
1. Click the `nginx-keycloak-role` checkbox, the click the `Assign` button.

### Verification

Can you verify that Keycloak is working by running running the [NGINX Plus OAuth Demo](NGINX_Plus_OAuth_Demo.postman_collection.json) Postman Collection.

## NGINX Plus

You will need to build an NGINX Plus container based on the [NGINX Plus documentation](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-docker/#running-nginx-plus-in-a-docker-container).

### Store the Keycloak Introspection Secret

Modify the `nginx-oauth-secrets.conf` file with your settings:

```bash
set $oauth_client_id          "nginx-plus";
set $oauth_client_secret      "your_secret_from_keycloak";
```
