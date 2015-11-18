#!/bin/sh
set -eu

bundle exec ipa distribute:deploygate \
 --file Distribution/AdHoc/${APPNAME}.ipa \
 --api_token $DEPLOYGATE_API_TOKEN \
 --user_name $DEPLOYGATE_USERNAME
