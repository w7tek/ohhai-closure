#!/bin/sh

# Usage:
# sh ${path_to_this_script}/soyc.sh <input-file.soy> <output-file.js>

SOY_COMPILER="$(dirname "$0")"/../google-closure-tools/templates/build/SoyToJsSrcCompiler.jar
java -jar "${SOY_COMPILER}" --shouldGenerateJsdoc --shouldProvideRequireSoyNamespaces --outputPathFormat "$2" "$1"


