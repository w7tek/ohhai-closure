#!/bin/sh

CLOSURE_TOOLS=../google-closure-tools
LIBRARY="${CLOSURE_TOOLS}/library"

[[ -d generated ]] || mkdir generated || exit -1

# for development mode, create a deps file
python "${CLOSURE_TOOLS}/library/closure/bin/build/depswriter.py" \
    --root="${CLOSURE_TOOLS}/library/closure/goog" \
    --path_with_depspath="infiniteList.js ../../../../ohhai-05-custom-component/infiniteList.js" > generated/deps.js

# for compiled mode
"${LIBRARY}/closure/bin/build/closurebuilder.py" \
    --root="${LIBRARY}" \
    --namespace us.w7tek.ohhai \
    --output_mode=compiled \
    --compiler_jar="${CLOSURE_TOOLS}/compiler/build/compiler.jar" \
    --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" \
    --compiler_flags="--jscomp_error=checkTypes" \
    --compiler_flags="--js" --compiler_flags="generated/deps.js" \
    ohhai.js infiniteList.js > generated/ohhai-compiled.js

