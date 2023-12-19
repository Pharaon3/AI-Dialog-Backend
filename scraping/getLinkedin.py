from openai import OpenAI
import textwrap

openai = OpenAI(api_key="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")
import json

def requestLinkedin(title, content):
    completion = openai.chat.completions.create(
        messages=[{
            "role": "system",
            "content": f"Take inspiration from the following post, but rephrase and add unique insights to make it your own. Maintain a professional and engaging tone. The original post is titled {title} and its content is as follows: {content}"
        }],
        model="gpt-3.5-turbo"
    )
    return completion.choices[0].message.content

def requestTweet(title, content):
    completion = openai.chat.completions.create(
        messages=[{
            "role": "system",
            "content": f"Take inspiration from the following post, but rephrase and add unique insights to make it your own Tweet to fit tweet's character limitation. Maintain a professional and engaging tone. The original post is titled {title} and its content is as follows: {content}"
        }],
        model="gpt-3.5-turbo"
    )
    return completion.choices[0].message.content

def requestHebrew(content):
    completion = openai.chat.completions.create(
        messages=[{
            "role": "system",
            "content": f"Transalte it in Hebrew. {content}"
        }],
        model="gpt-3.5-turbo"
    )
    return completion.choices[0].message.content

# # Assuming data.json contains the array of objects
# with open('../json/scaned make 1.json', 'r') as file:
#     data = json.load(file)

# # Loop through each object and update with LinkedIn content
# for obj in data:
#     obj['linkedin'] = requestLinkedin(obj['title'], textwrap.shorten(obj['content'], width=3000))
#     obj['tweet'] = requestTweet(obj['title'], textwrap.shorten(obj['content'], width=3000))

# # Write the updated data back to the JSON file
# with open('data.json', 'w') as file:
#     json.dump(data, file, indent=2)


# Assuming data.json contains the array of objects
with open('./data.json', 'r') as file:
    data = json.load(file)

# Loop through each object and update with LinkedIn content
for obj in data:
    obj['linkedin'] = requestHebrew(textwrap.shorten(obj['linkedin'], width=3000))
    obj['tweet'] = requestHebrew(textwrap.shorten(obj['tweet'], width=3000))

# Write the updated data back to the JSON file
with open('data1.json', 'w') as file:
    json.dump(data, file, indent=2)

