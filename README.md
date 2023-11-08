# API PoC - API Impl + OAS Spec

## Build

```bash
docker build -t kuadrant/petstore3:latest .
```


## Run
```bash
docker run  --name swaggerapi-petstore3 -d -p 8080:8080 kuadrant/petstore3:latest
```