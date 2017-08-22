let express = require('express');
let router = express.Router();

/*let server = require('../../server');
let io = server.io;*/
let auth = require('./auth');

router.use('/auth', auth);

router.use('/', (req, res) => {
    res.json({api: "root"});
});

module.exports = router;
