#!/bin/sh

../lib/closure-library/closure/bin/build/closurebuilder.py \
    --root=../lib/closure-library \
    --root=. \
    --namespace=us.w7tek.ohhai \
    --output_mode=compiled \
    --compiler_jar=../build/closure-compiler/build/compiler.jar \
    --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" > ohhai-compiled.js
