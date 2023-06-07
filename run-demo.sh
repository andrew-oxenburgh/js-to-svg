#!/bin/bash

rm -rf ./dist

yarn compile

rm -rf ./out/*

node ./examples/octothorpe.ts
