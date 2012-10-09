#!/bin/sh

[[ -d generated ]] || mkdir generated || exit -1

CLOSURE_TOOLS=../google-closure-tools
LIBRARY="${CLOSURE_TOOLS}/library"
SOY_COMPILER="${CLOSURE_TOOLS}/templates/build/SoyToJsSrcCompiler.jar"

java -jar "${SOY_COMPILER}" \
    --shouldGenerateJsdoc \
    --shouldProvideRequireSoyNamespaces \
    --outputPathFormat generated/ohhai-soy.js \
    ohhai.soy

# for development mode, create a deps file that knows about soyutils
python "${LIBRARY}/closure/bin/build/depswriter.py" \
    --root="${LIBRARY}/closure/goog" \
    --root_with_prefix="${CLOSURE_TOOLS}/templates/javascript ../../../templates/javascript/" > generated/deps.js

# for compiled mode
"${LIBRARY}/closure/bin/build/closurebuilder.py" \
    --root="${LIBRARY}" \
    --root="${CLOSURE_TOOLS}/templates/javascript/" \
    --namespace us.w7tek.ohhai \
    --output_mode=compiled \
    --compiler_jar="${CLOSURE_TOOLS}/compiler/build/compiler.jar" \
    --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" \
    --compiler_flags="--jscomp_error=checkTypes" \
    generated/ohhai-soy.js ohhai.js > generated/ohhai-soy-compiled.js
