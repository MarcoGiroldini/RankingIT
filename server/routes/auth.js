let express = require('express');
let router = express.Router();

let server = require('../../server');
let io = server.io;

let admin = require('firebase-admin');
let f = require('../model/functions');

router.post('/login', (req, res) =>{
    let idToken = req.body.token;

    admin.auth().verifyIdToken(idToken)
        .then((decodedToken) => {
            f.checkUserExists(decodedToken.uid)
                .then((exists) => {
                    if (exists)
                        f.sendOK(req, res, {"success": true, "message": "User already exists, logged in"});
                    else
                        f.addUser(decodedToken.uid)
                            .then((result) => {
                                f.sendOK(req, res, {"success": true, "message": "User created, logged in"});
                            }).catch((err) => {
                                f.sendErr(req, res, 500, err);
                            });
                }).catch((err) => {
                    f.sendErr(req, res, 500, err)
                });
        }).catch((err) => {
            f.sendErr(req, res, 401, err)
        });
});

/*router.get('/test', (req,res) =>{
   res.status(401).json({
       error: "Sei un nabbo"
   })
});*/

module.exports = router;
