#!/bin/sh

[[ -d generated ]] || mkdir generated || exit -1

CLOSURE_TOOLS=../google-closure-tools
LIBRARY="${CLOSURE_TOOLS}/library"

"${LIBRARY}/closure/bin/build/closurebuilder.py" \
    --root="${LIBRARY}" \
    --namespace us.w7tek.ohhai \
    --output_mode=compiled \
    --compiler_jar="${CLOSURE_TOOLS}/compiler/build/compiler.jar" \
    --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" \
    ohhai.js > generated/ohhai-compiled.js
