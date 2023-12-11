const db = require("../models");
const Pbns = db.pbns;
const moment = require('moment');
require('dotenv').config();

var OPENAI_API_KEY   = process.env.OPENAI_API_KEY;
// Retrieve all products from the database.
exports.getLinkedin = async (req, res) => {
  const content = await requestLinkedin(req.body.title, req.body.content);
  const image = await requestLinkedinImage(req.body.title, req.body.content);
  res.status(200).send({ title: req.body.title, content: content, image: image });
};
exports.getTwitter = async (req, res) => {
  const content = await requestTweet(req.body.title, req.body.content);
  res.status(200).send({ title: "Title", content: content });
};

// Find a single product with an id
exports.findOne = (req, res) => {
  res.status(200).send({ title: "Title", content: "Content" });
};

const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

async function requestLinkedin(title, content) {
  const completion = await openai.chat.completions.create({
    messages: [{ 
      role: "system", 
      content: "Give me a simple linkedin post contents in Hebew based on the following data not just translate but modify it. Title is " + title + " and content is similar to : " + content 
    }],
    model: "gpt-3.5-turbo",
  });
  console.log("linkedin post: " + completion?.choices[0]?.message?.content);
  return completion?.choices[0]?.message?.content;
}

async function requestTweet(title, content) {
  const completion = await openai.chat.completions.create({
    messages: [{ 
      role: "system", 
      content: "Give me a simple Tweet post contents with character limitation of Twitter in Hebew based on the following data not just translate but modify it. Title is " + title + " and content is similar to: " + content 
    }],
    model: "gpt-3.5-turbo",
  });
  console.log("Tweet: " + completion?.choices[0]?.message?.content);
  return completion?.choices[0]?.message?.content;
}

async function requestLinkedinImage(title, content) {
  const image = await openai.images.generate({ prompt: "Linkedin Post Image without any letters. The Linkedin post title is " + title + " and content is : " + content.substring(0, 500) });
  // const image1 = await openai.createImageVariation(
  //   image="https://lh3.googleusercontent.com/OkPvii8KHh8AnK4lJITCKYDf8Unr5_jaPAjjF468zwHWQCTAgtwteb7IcQuW3hstG1YNKxhFa1TBfiFWCrkeUWVU6ysB7MfMzE7OPDLvciL4TVrzgQ=w625-h350-n-nu-rw",
  //   n=2,
  //   size="1024x1024"
  // )
  console.log(image.data);
  // console.log(image1.data);
  return image.data;
}