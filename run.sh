#!/bin/sh

docker build -t pof-client .
docker kill pof-client; docker rm pof-client
docker run -d --name pof-client -p 80:80 pof-client

echo listening on port 80