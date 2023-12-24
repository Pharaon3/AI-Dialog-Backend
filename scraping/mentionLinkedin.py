import csv
import threading

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
import pandas as pd
import time
import re
import csv
from datetime import datetime
from datetime import date
import json
from datetime import datetime

options = webdriver.ChromeOptions()
# options.add_argument('headless')
options.add_argument('window-size=1920x1080')
options.add_argument("disable-gpu")
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

with open('contents.txt', 'r') as file:
    lines = file.readlines()
    content = ' '.join([line.strip() for line in lines])

driver.get("https://mention.com/en/linkedin-post-generator/")
time.sleep(3)

current_datetime = datetime.now()
formatted_datetime = current_datetime.strftime("%Y/%m/%d %H:%M:%S")

outData = []
inputForm = driver.find_element(By.ID, "describe")
emailForm = driver.find_element(By.ID, "user-email")

submitButton = driver.find_element(By.XPATH, '//*[@id="men__bio-generator"]/div/div[3]/form/div[4]/input')
outputForm = driver.find_element(By.ID, "generated-bio")

inputForm.send_keys(content)

select_element = driver.find_element(By.ID, "tone")
creativeOption = driver.find_element(By.XPATH, '//*[@value="creative"]')
select_element.click()
creativeOption.click()

emailForm.send_keys("edmonddantes000313@gmail.com")
submitButton.click()
# submitButton.click()
time.sleep(5)
outputData = outputForm.get_attribute('value')
with open('mentionLinkedin.txt', 'w', encoding='utf-8') as file:
    file.write(outputData)
print("success")
driver.quit()
