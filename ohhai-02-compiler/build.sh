#!/bin/sh

CLOSURE_TOOLS=../google-closure-tools

[[ -d generated ]] || mkdir generated || exit -1

"${CLOSURE_TOOLS}/library/closure/bin/build/closurebuilder.py" \
    --root="${CLOSURE_TOOLS}/library" \
    --namespace=us.w7tek.ohhai \
    --output_mode=compiled \
    --compiler_jar="${CLOSURE_TOOLS}/compiler/build/compiler.jar" \
    --compiler_flags="--compilation_level=SIMPLE_OPTIMIZATIONS" \
    ohhai.js > generated/ohhai-compiled-simple.js

"${CLOSURE_TOOLS}/library/closure/bin/build/closurebuilder.py" \
    --root="${CLOSURE_TOOLS}/library" \
    --namespace=us.w7tek.ohhai \
    --output_mode=compiled \
    --compiler_jar="${CLOSURE_TOOLS}/compiler/build/compiler.jar" \
    --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" \
    ohhai.js > generated/ohhai-compiled-advanced.js

