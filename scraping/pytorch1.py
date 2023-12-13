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

options = webdriver.ChromeOptions()
# options.add_argument('headless')
options.add_argument('window-size=1920x1080')
options.add_argument("disable-gpu")
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

time.sleep(3)
links = []
with open('pytorch1.csv', 'r') as file:
    reader = csv.reader(file)
    for row in reader:
        links.append(row[0]) 
with open('pytorch2.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    for link in links:
        driver.get(link)
        time.sleep(2)
        blogs = driver.find_elements(By.CSS_SELECTOR, "div.vertical-blog-container")
        for c in range(0, len(blogs)):
            blog = blogs[c]
            link = blog.find_element(By.TAG_NAME, "a").get_attribute('href')
            title = blog.find_element(By.TAG_NAME, "a").text
            content = blog.find_elements(By.TAG_NAME, "p")[1].text
            writer.writerow([link, title, content])
driver.close()