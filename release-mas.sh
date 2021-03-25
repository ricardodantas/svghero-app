#!/bin/bash

TARGET=$1

export DISTRIBUTION=mas
export CSC_KEY_PASSWORD=""
export CSC_LINK="/Users/ricardodantas/Certificates_Apple_Developer_mas.p12"


if [ "$TARGET" == 'dev' ]
then
  echo "Building for DEV distribution...";
  yarn release:mas-dev
else
  yarn release:mas
fi



########################
# Uncomment when not using electron-builder package
########################
# RELEASES_PATH="release"
# MAS_RELEASE_PATH="$RELEASES_PATH/mas"

# # Name of your app.
# APP="SvgHero"

# # The path of your app to sign.
# APP_PATH="$MAS_RELEASE_PATH/$APP.app"

# # The path to the location you want to put the signed package.
# RESULT_PATH="$MAS_RELEASE_PATH/$APP.pkg"

# # The name of certificates you requested.
# APP_KEY="3rd Party Mac Developer Application: Ricardo Dantas Gonçalves (8966HM892G)"
# INSTALLER_KEY="3rd Party Mac Developer Installer: Ricardo Dantas Gonçalves (8966HM892G)"

# # The path of your plist files.
# PARENT_PLIST="assets/entitlements.mas.plist"
# CHILD_PLIST="assets/entitlements.mas.inherit.plist"
# LOGINHELPER_PLIST="assets/entitlements.mas.loginhelper.plist"
# FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"

# codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Electron Framework"
# codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libffmpeg.dylib"
# codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Libraries/libffmpeg.dylib"
# codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework"
# codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper.app/Contents/MacOS/$APP Helper"
# codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper.app/"
# codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/Contents/MacOS/$APP Login Helper"
# codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/"
# codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$APP_PATH/Contents/MacOS/$APP"
# codesign -s "$APP_KEY" -f --entitlements "$PARENT_PLIST" "$APP_PATH"

# productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"
