var express = require('express');
var admin = require('./../inc/admin');
var moment = require('moment');
var router = express.Router();

router.get('/', function(req, res, next) {

  admin.getPortfolio().then(portfolio => {
    admin.getSettings().then(results => {

      settings = results[0];

      res.render("index", {
        
        portfolio,
        settings,
        moment
      });
  
    })}).catch(err=>{

      admin.render(req, res, err.message);

    });
});

module.exports = router;