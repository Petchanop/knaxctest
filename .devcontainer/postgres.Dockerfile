FROM postgres:latest

ARG POSTGRES_USER 
ARG POSTGRES_PASSWORD 
ARG POSTGRES_DB

RUN echo $POSTGRES_USER

COPY init.sql /docker-entrypoint-initdb.d/