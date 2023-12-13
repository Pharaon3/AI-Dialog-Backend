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
options.add_argument("--disable-images")
options.add_argument("--disable-video")
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

current_datetime = datetime.now()
formatted_datetime = current_datetime.strftime("%Y/%m/%d %H:%M:%S")

links = []
with open('pytorch2.json') as file:
    # Load the JSON data
    pytorchData = json.load(file)
outData = []
for row in pytorchData:
    driver.get(row["link"])
    time.sleep(1)
    content1 = driver.find_element(By.TAG_NAME, "article").text
    imgArray = []
    img = driver.find_element(By.TAG_NAME, "article").find_elements(By.TAG_NAME, "img")
    for img_element in img:
        # Get the src attribute value
        src = img_element.get_attribute("src")
        # Append the src value to the array
        imgArray.append(src)
    outData.append({"title": row["title"], "content": row["content"], "link": row["link"], "imgSource": imgArray, "content1": content1, "time": formatted_datetime})=

with open('../json/scaned pytorch.json', 'r') as file:
    # Load the JSON data from the file
    origin_data = json.load(file)
existing_array = origin_data
for c in range (0, len(outData)):
    new_object = outData[c]
    title_exists = any(obj["title"] == new_object["title"] for obj in existing_array)
    if not title_exists:
        existing_array.append(new_object)
with open("../json/scaned pytorch.json", "w") as file:
    json.dump(existing_array, file)
driver.quit()
