const controller = require("../controllers/pbns.controller");
const router = require('express').Router();


module.exports = app => {

    router.post("/getLinkedin", controller.getLinkedin);
    router.post("/getTweet", controller.getTweet);
    router.post("/getJson", controller.getJson);

    // app.use('/api/products', [authJwt.verifyToken, verifyMembership.checkMembership], router);
    app.use('/api', router);
    // app.use('/api/products',[authJwt.verifyToken], router);
  };