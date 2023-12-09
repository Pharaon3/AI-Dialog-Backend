const controller = require("../controllers/spamzilla.controller");
const router = require('express').Router();


module.exports = app => {

    router.post("/", controller.findAll);
    router.get("/:id", controller.findOne);

    // app.use('/api/products', [authJwt.verifyToken, verifyMembership.checkMembership], router);
    app.use('/api/spamzilla', router);
    // app.use('/api/products',[authJwt.verifyToken], router);
  };