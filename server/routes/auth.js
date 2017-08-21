let express = require('express');
let router = express.Router();

var admin = require("firebase-admin");

var serviceAccount = require("../config/firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://rankingit-176916.firebaseio.com"
});

router.use('/login', (req, res) =>{

});

module.exports = router;
