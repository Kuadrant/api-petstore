# API PoC - API Impl + OAS Spec

## Build

```bash
docker build -t kuadrant/petstore3:latest .
```


## Run
```bash
docker run  --name swaggerapi-petstore3 -d -p 8080:8080 kuadrant/petstore3:latest
```


## OAS Spec

Here:

`src/main/resources/openapi.yaml`

## Deploy

```bash
kubectl apply -f resources/petstore.yaml
kubectl wait --namespace=default --for=condition=available --timeout=300s deployment/petstore
echo "Petstore API: https://$(kubectl get httproute petstore-route -n default -o jsonpath='{.spec.hostnames[0]}')"
```
