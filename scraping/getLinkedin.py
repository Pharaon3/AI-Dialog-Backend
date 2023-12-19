from openai import OpenAI

openai = OpenAI(api_key="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")
import json

async def requestLinkedin(title, content):
    completion = await openai.chat.completions.create(
        messages=[{
            "role": "system",
            "content": f"Take inspiration from the following post, but rephrase and add unique insights to make it your own. Maintain a professional and engaging tone. The original post is titled {title} and its content is as follows: {content}"
        }],
        model="gpt-3.5-turbo"
    )
    return completion.choices[0].message.content

# Assuming data.json contains the array of objects
with open('../json/scaned make.json', 'r') as file:
    data = json.load(file)

# Loop through each object and update with LinkedIn content
for obj in data:
    obj['linkedin'] = requestLinkedin(obj['title'], obj['content'])

# Write the updated data back to the JSON file
with open('data.json', 'w') as file:
    json.dump(data, file, indent=2)

