import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service


def handler(event, context):

    binary_location = event.get('binary_location', '/opt/headless-chromium')
    driver_location = event.get('driver_location', '/opt/chromedriver')

    options = Options()
    options.binary_location = binary_location
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--single-process')
    options.add_argument('--disable-dev-shm-usage')

    service = Service(driver_location)
    driver = webdriver.Chrome(service=service, options=options)
    driver.get('https://www.google.com/')

    driver.close()
    driver.quit()

    response = {
        "statusCode": 200,
        "body": "Selenium Headless Chrome Initialized"
    }

    return response


# handler({'binary_location': os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'chromedriver/headless-chromium')),
#         'driver_location': os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'chromedriver/chromedriver'))}, None)
