#!/bin/sh

docker build -t bs-client .
docker kill bs-client; docker rm bs-client
docker run -d --name bs-client -p 80:80 bs-client

echo listening on port 80