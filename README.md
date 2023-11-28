# API PoC - API Impl + OAS Spec

## Build

```bash
# Multiarch with buildx
docker buildx create --name mybuilder --use
docker buildx inspect --bootstrap

docker buildx build --platform linux/amd64,linux/arm64 -t quay.io/kuadrant/petstore3:1.0.5 --push .
```

### Local build
```bash
docker buildx build --load --platform linux/arm64 -t quay.io/kuadrant/petstore3:1.0.5 .
```

## Run

```bash
docker run --name swaggerapi-petstore3 -p 8080:8080 quay.io/kuadrant/petstore3:1.0.5
```


## OAS Spec

Here:

`openapi.yaml`

## Deploy

```bash
kubectl apply -f resources/app.yaml
kubectl wait --namespace=default --for=condition=available --timeout=300s deployment/petstore
kuadrantctl generate gatewayapi httproute --oas src/main/resources/openapi.yaml | kubectl apply -f -
kuadrantctl generate kuadrant ratelimitpolicy --oas src/main/resources/openapi.yaml | kubectl apply -f -
echo "Petstore API: https://$(kubectl get httproute petstore-route -n default -o jsonpath='{.spec.hostnames[0]}')"
```

## Creating the ApplicationSet & placment resource in ArgoCD

```bash
kubectl -n argocd apply -f argocd/
```

## Scaling up the ApplicationSet to 2 clusters

This actually does 2 things:

* adds the petstore-region-us managedclusterset to the clusterSets list
* sets the numberOfClusters to 2

```bash
kubectl patch placement petstore -n argocd --type='json' -p='[{"op": "add", "path": "/spec/clusterSets/-", "value": "petstore-region-us"}, {"op": "replace", "path": "/spec/numberOfClusters", "value": 2}]'
```
