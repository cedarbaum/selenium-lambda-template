#!/bin/bash

# https://github.com/soumilshah1995/Selenium-on-AWS-Lambda-Python3.7/blob/main/chrome_headless_lambda_layer.sh
SELENIUM_VER=3.141.0
CHROME_BINARY_VER=v1.0.0-55 # based on Chromium 69.0.3497.81
CHROMEDRIVER_VER=2.43       # supports Chrome v69-71
 
# Download chrome driver
mkdir -p chromedriver
cd chromedriver
curl -SL https://chromedriver.storage.googleapis.com/$CHROMEDRIVER_VER/chromedriver_linux64.zip > chromedriver.zip
unzip chromedriver.zip
rm chromedriver.zip

# Download chrome binary
curl -SL https://github.com/adieuadieu/serverless-chrome/releases/download//$CHROME_BINARY_VER/stable-headless-chromium-amazonlinux-2017-03.zip > headless-chromium.zip
unzip headless-chromium.zip
rm headless-chromium.zip

# Compress driver and binary
zip -r chromedriver.zip chromedriver headless-chromium