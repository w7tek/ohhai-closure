#!/bin/sh

#
# USAGE: /bin/sh compile.sh [ ADVANCED_OPTIMIZATIONS | SIMPLE_OPTIMIZATIONS ] [ opt [ ... ] ]
#

CLOSURE_TOOLS=../google-closure-tools
LIBRARY="${CLOSURE_TOOLS}/library"
BUILDER="${LIBRARY}/closure/bin/build/closurebuilder.py"

if [[ "$1" = "SIMPLE_OPTIMIZATIONS" || "$1" = "ADVANCED_OPTIMIZATIONS" ]]; then
    COMPILE_LEVEL=$1
    shift
else
    COMPILE_LEVEL="SIMPLE_OPTIMIZATIONS"
fi

"${BUILDER}" \
    --root="${LIBRARY}" \
    --output_mode=compiled \
    --compiler_jar="${CLOSURE_TOOLS}/compiler/build/compiler.jar" \
    --compiler_flags="--compilation_level=${COMPILE_LEVEL}" \
    "$@"
