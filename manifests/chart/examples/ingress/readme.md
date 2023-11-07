# Ingress
This example shows how to expose a web-application to the world wide web.

```yaml
labels:
  app: my-app

network:
  allow-ingress:
    selector: app == 'my-app'
    ingress:
    - action: Allow
    egress:
    - action: Allow

deployments:
  my-deployment:
    selectorLabels:
      app: my-app
    containers:
    - name: main
      ports:
      - port: 8080
        name: http

services:
  my-service:
    selector:
      app: my-app
    ports:
    - port: 80
      targetPort: http

ingress:
  my-ingress:
    # className refers to an existing ingress class. Our shared cluster has 2 installed ingress controllers:
    # nginx-internal: Load Balancer that's only accessable internally
    # nginx-external: Internet-facing Load Balancer
    className: nginx-internal
    paths:
    - path: /
      service: my-service
      port: 80
    tls:
      # Use this property to load a secret that is created as part of the helm chart installation
      secretName: my-certificate
      # Use this property to refer to an existing secret that holds the SSL certificate
      secretNameOverride: null
```

## SSL Termination
All ingresses should be configured with SSL termination. Therefore you need to create a secret that holds the SSL certificate. The secret should be created in the same namespace as the ingress.
Since this SSL certificate must be stored in a secure location, we recommend to use the [Secrets Store CSI Driver](../inject-keyvault-secrets/readme.md) to synchronize the certificate from an Azure Key Vault as a Kubernetes secret.
This can be done by using a Kubernetes Job. During a helm release the Job triggers the CSI Driver to start the certificate synchronization. The code snipped below shows how to configure this:

```yaml
tenantId: <tenant-id>
keyVaultName: <keyvault-name>
workloadIdentity: <managed identity ClientID with certificate and secret read-permissions on the keyvault>

secrets:
  certificate:
    type: keyvault
    tls: <keyvault_cert_name>

jobs:
  certificate-init:
    annotations:
      helm.sh/hook: post-install,post-upgrade
    labels:
      component: certificate
    secrets:
      - certificate
    containers:
      - name: main
        command:
          - sleep
        args:
          - '1'

ingress:
  my-ingress:
    className: nginx-internal
    paths:
    - path: /
      service: my-service
      port: 80
    tls:
      secretName: certificate
```