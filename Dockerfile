# First stage: Maven build
FROM maven:3.8.6-openjdk-8 as builder

COPY . /build

WORKDIR /build

RUN mvn package

FROM openjdk:8-jre-alpine

WORKDIR /swagger-petstore

COPY --from=builder /build/target/*.war /swagger-petstore/server.war

COPY --from=builder /build/src/main/resources/openapi.yaml /swagger-petstore/openapi.yaml
COPY --from=builder /build/inflector.yaml /swagger-petstore/

COPY --from=builder /build/target/lib/jetty-runner.jar /swagger-petstore/jetty-runner.jar

EXPOSE 8080

# Set the command to run Jetty
CMD ["java", "-jar", "-DswaggerUrl=openapi.yaml", "/swagger-petstore/jetty-runner.jar", "--log", "/var/log/yyyy_mm_dd-requests.log", "/swagger-petstore/server.war"]
