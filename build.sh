#!/bin/sh

git pull
npm install
npm run build:prod
docker build -t pof-client .