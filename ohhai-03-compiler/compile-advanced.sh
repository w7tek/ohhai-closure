#!/bin/sh

CLOSURE_TOOLS=../google-closure-tools
"${CLOSURE_TOOLS}/library/closure/bin/build/closurebuilder.py" \
    --root="${CLOSURE_TOOLS}/library" \
    --namespace=us.w7tek.ohhai \
    --output_mode=compiled \
    --compiler_jar="${CLOSURE_TOOLS}/compiler/build/compiler.jar" \
    --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" ohhai.js > ohhai-compiled.js
