# API PoC - API Impl + OAS Spec

## Build

```bash
docker buildx build --platform linux/amd64,linux/arm64 -t quay.io/kuadrant/petstore3:1.0.0 --push .
```


## Run
```bash
docker run --name swaggerapi-petstore3 -d -p 8080:8080 quay.io/kuadrant/petstore3:1.0.0
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
