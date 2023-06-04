#!/bin/bash

rm -rf ./dist

yarn compile

rm -rf ./out/*
node ./dist/demo/number-one.js
#node ./dist/demo/circle.js
#node ./dist/demo/complex-demo.js
