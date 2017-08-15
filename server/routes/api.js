let express = require('express');
let router = express.Router();

let server = require('../../server');
let io = server.io;

/* GET home page api. */
router.use('/', function(req, res) {
    res.json({api: "root"});
});

module.exports = router;
