#!/bin/bash

TARGET=$1

export DISTRIBUTION=mas
export CSC_KEY_PASSWORD=""
export CSC_LINK="$CSC_LINK_MAS"


if [ "$TARGET" == 'dev' ]
then
  echo "Building for DEV distribution...";
  yarn release:mas-dev
else
  yarn release:mas
fi
