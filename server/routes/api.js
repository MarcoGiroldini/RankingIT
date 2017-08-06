var express = require('express');
var router = express.Router();

var server = require('../../server');
var io = server.io;

/* GET home page api. */
router.use('/', function(req, res, next) {
    res.json({api: "root"});
});

module.exports = router;