let express = require('express');
let router = express.Router();

/*let server = require('../../server');
let io = server.io;*/
let auth = require('./auth');

/* Home page api. */
router.use('/', (req, res) => {
    res.json({api: "root"});
});

router.use('/auth', auth);

module.exports = router;
