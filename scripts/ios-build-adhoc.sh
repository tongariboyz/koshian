#!/bin/sh
set -eu

APPLE_AUTHORITY_BASE64= \
  DISTRIBUTION_CERTIFICATE_BASE64= \
  DISTRIBUTION_KEY_BASE64= \
  DEPLOYGATE_API_TOKEN=  \
  DEPLOYGATE_USERNAME= \
  ITUNES_CONNECT_ACCOUNT= \
  ITUNES_CONNECT_PASSWORD= \
  KEY_PASSWORD= \
  bundle exec ipa build \
    --project "$XCODE_PROJECT" \
    --scheme "$APPNAME" \
    --configuration Release \
    --destination Distribution/AdHoc
