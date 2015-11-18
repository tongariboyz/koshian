#!/bin/sh
set -eu

# download
bundle exec ios profiles:download:all --type distribution -u "$ITUNES_CONNECT_ACCOUNT" -p "$ITUNES_CONNECT_PASSWORD" >/dev/null 2>&1

# create dir & mv
mkdir -p MobileProvisionings
mv *.mobileprovision MobileProvisionings/

BASE=~/Library/MobileDevice/Provisioning\ Profiles
mkdir -p "$BASE"
for file in MobileProvisionings/*.mobileprovision; do
  uuid=`grep UUID -A1 -a "$file" | grep -io "[-A-Z0-9]\{36\}"`
  extension="${file##*.}"
  echo "$file -> $uuid"
  cp -f "$file" "$BASE/$uuid.$extension"
done
ls -lsa "$BASE"
