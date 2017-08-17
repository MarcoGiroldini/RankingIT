let express = require('express');
let router = express.Router();

let server = require('../../server');
let io = server.io;

/* Home page api. */
router.use('/', (req, res) => {
    res.json({api: "root"});
});

module.exports = router;
