# Stage 1: Build JAR using Maven on Java 21
FROM maven:3.9-eclipse-temurin-21-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Minimal runtime image (JRE 21 Alpine)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy the compiled JAR artifact
COPY --from=builder /app/target/spring-data-graphql-1.2.0-SNAPSHOT.jar ./spring-data-graphql.jar

# Directory for mounted articles from /content/articles
RUN mkdir -p /app/content/articles

EXPOSE 4000
ENTRYPOINT ["java", "-jar", "spring-data-graphql.jar"]