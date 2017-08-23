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
                        res.sendOK(req, res, "User already exists, logged in");    //Debug msg, output exists only
                    else
                        f.addUser(decodedToken.uid)
                            .then((result) => {
                                res.sendOK(req, res, "User created, logged in");    //Debug msg, output result only
                            }).catch((err) => {
                                res.sendErr(req, res, 500, err);
                            });
                }).catch((err) => {
                    res.sendErr(req, res, 500, err)
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
