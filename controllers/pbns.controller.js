const db = require("../models");
const Pbns = db.pbns;
const moment = require('moment');
require('dotenv').config();

var OPENAI_API_KEY   = process.env.OPENAI_API_KEY;
// Retrieve all products from the database.
exports.getLinkedin = async (req, res) => {
  const content = await requestLinkedin(req.body.title, req.body.content);
  const contentHebrew = await requestLinkedin(content);
  const image = await requestLinkedinImage(req.body.title, req.body.content);
  res.status(200).send({ title: req.body.title, content: contentHebrew, image: image });
};
exports.getTweet = async (req, res) => {
  const content = await requestTweet(req.body.title, req.body.content);
  const contentHebrew = await requestLinkedin(content);
  res.status(200).send({ title: "Title", content: contentHebrew });
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
      content: "Take inspiration from the following post, but rephrase and add unique insights to make it your own. Maintain a professional and engaging tone. The original post is titled " + title + " and its content is as follows: " + content
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
      content: "Take inspiration from the following post, but rephrase and add unique insights to make it your own Tweet to fit tweet's character limitation. Maintain a professional and engaging tone. The original post is titled " + title + " and its content is as follows: " + content
    }],
    model: "gpt-3.5-turbo",
  });
  console.log("Tweet: " + completion?.choices[0]?.message?.content);
  return completion?.choices[0]?.message?.content;
}

async function requestHebrew(content) {
  const completion = await openai.chat.completions.create({
    messages: [{ 
      role: "system", 
      content: "Transalte it in Hebrew. " + content
    }],
    model: "gpt-3.5-turbo",
  });
  return completion?.choices[0]?.message?.content;
}

async function requestLinkedinImage(title, content) {
  const image = await openai.images.generate({ prompt: "Generate a professional and visually appealing graphic to accompany the LinkedIn post below. The post is titled " + title + " and its content is as follows:" + content.substring(0, 500) });
  return image.data;
}