#!/bin/sh
set -eu

./scripts/ios-import-certs.sh \
  && ./scripts/ios-download-profiles.sh \
  && APPLE_AUTHORITY_BASE64= \
    DISTRIBUTION_CERTIFICATE_BASE64= \
    DISTRIBUTION_KEY_BASE64= \
    DEPLOYGATE_API_TOKEN=  \
    DEPLOYGATE_USERNAME= \
    ITUNES_CONNECT_ACCOUNT= \
    ITUNES_CONNECT_PASSWORD= \
    KEY_PASSWORD= \
    ./scripts/ios-build-adhoc.sh \
  && ./scripts/ios-deploy-deploygate.sh
