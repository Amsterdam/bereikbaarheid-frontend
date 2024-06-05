#!/bin/bash

# Based on this article: https://www.freecodecamp.org/news/how-to-implement-runtime-environment-variables-with-create-react-app-docker-and-nginx-7f9d42a91d70/

# Recreate config file
FOLDER=/var/www/html/env-config
rm -rf $FOLDER/env-config.js
mkdir -p $FOLDER
touch $FOLDER/env-config.js

# Add assignment
echo "window._env_ = {
  REACT_APP_APPLICATIONINSIGHTS_CONNECTION_STRING: \"${APPLICATIONINSIGHTS_CONNECTION_STRING}\"
}" >> $FOLDER/env-config.js
