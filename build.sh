#!/bin/sh

git pull
npm install
npm run build:prod
cp src/public/index.html dist
cp -r src/public/css dist
cp -r src/public/lib dist
cp -r src/public/images dist