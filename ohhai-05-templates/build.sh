#!/bin/sh

CLOSURE_TOOLS=../google-closure-tools
sh ../build/soyc.sh ohhai.soy ohhai-soy.js

sh ../build/jsc.sh ADVANCED_OPTIMIZATIONS --root "${CLOSURE_TOOLS}/templates/javascript/" --namespace us.w7tek.ohhai ohhai-soy.js ohhai.js > ohhai-soy-compiled.js