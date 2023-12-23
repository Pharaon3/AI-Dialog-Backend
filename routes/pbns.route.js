const controller = require("../controllers/pbns.controller");
const router = require('express').Router();


module.exports = app => {

    router.post("/getImage", controller.getImage);
    router.post("/getLinkedin", controller.getLinkedin);
    router.post("/getLinkedin1", controller.getLinkedin1);
    router.post("/getTweet", controller.getTweet);
    router.post("/getJson", controller.getJson);
    router.post("/makeString", controller.makeString);

    // app.use('/api/products', [authJwt.verifyToken, verifyMembership.checkMembership], router);
    app.use('/api', router);
    // app.use('/api/products',[authJwt.verifyToken], router);
  };