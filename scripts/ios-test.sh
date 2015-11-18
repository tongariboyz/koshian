#!/bin/sh
set -eu

xcodebuild \
  CODE_SIGNING_REQUIRED=NO \
  CODE_SIGN_IDENTITY= \
  PROVISIONING_PROFILE= \
  -sdk iphonesimulator \
  -destination 'platform=iOS Simulator,OS=9.0,name=iPhone 6' \
  -project "$XCODE_PROJECT" \
  -scheme "$APPNAME" \
  clean build test | bundle exec xcpretty -c && exit ${PIPESTATUS[0]}
