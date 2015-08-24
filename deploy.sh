#!/bin/sh

cd ~

cd $POF_CLIENT_PATH && npm run build:prod && divshot push production