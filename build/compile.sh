#!/bin/sh

#
# USAGE: /bin/sh compile.sh [ ADVANCED_OPTIMIZATIONS | SIMPLE_OPTIMIZATIONS ] [ opt [ ... ] ]
#

BUILD="$(dirname $0)"
LIBRARY="$BUILD/../lib"
BUILDER="$LIBRARY/closure-library/closure/bin/build/closurebuilder.py"

if [[ "$1" = "SIMPLE_OPTIMIZATIONS" || "$1" = "ADVANCED_OPTIMIZATIONS" ]]; then
    COMPILE_LEVEL=$1
    shift
else
    COMPILE_LEVEL="SIMPLE_OPTIMIZATIONS"
fi

"$BUILDER" \
    --root="$LIBRARY/closure-library" \
    --output_mode=compiled \
    --compiler_jar="$BUILD/closure-compiler/build/compiler.jar" \
    --compiler_flags="--compilation_level=$COMPILE_LEVEL" \
    "$@"

