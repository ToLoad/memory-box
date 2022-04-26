FROM openjdk:11

VOLUME ["/upload", "/upload"]

ARG JAR_FILE=build/libs/*.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-Dspring.profiles.active=dev", "-jar","/app.jar"]

EXPOSE 8080