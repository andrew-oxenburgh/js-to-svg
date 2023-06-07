#!/bin/bash

rm -rf ./dist

yarn compile

rm -rf ./out/*
node ./examples/number-one.ts
node ./examples/circle.ts
node ./examples/complex-demo.ts
