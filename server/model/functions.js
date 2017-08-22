let f = module.exports = {};

let admin = require('firebase-admin');
let mysql = require('mysql');

let config = require('../config/config.json');

admin.initializeApp({
    credential: admin.credential.cert(config.credential),
    databaseURL: config.firebaseDB.databaseURL
});

let pool = mysql.createPool({
    connectionLimit: config.database.connectionLimit,
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
});

// UTILS
f.sendOK = (req, res, data) => {
    res.status(200).json({
        data: data
    });
};
f.sendErr = (req, res, errCode, errMsg) => {
    res.status(errCode).json({
        error: errMsg
    });
};

/** Users functions **/

f.checkUserExists = (uid) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) =>{
            conn.query('SELECT id FROM users WHERE id = ?', [uid], (err, result) => {
                conn.release();
                if (err)
                    reject(err);

                if (result[0].uid)
                    resolve(true);
                else
                    resolve(false);
            });
        });
    });
};

f.addUser = (uid) => {
    return new Promise((resolve, reject) => {
        admin.auth().getUser(uid)
            .then((userRecord) => {
                pool.getConnection((err, conn) => {
                    conn.query('INSERT INTO users (id, displayName, email, photoURL) VALUES (?, ?, ?, ?)',
                        [uid, userRecord.displayName, userRecord.email, userRecord.photoURL],
                        (err) => {
                            conn.release();
                            if (err)
                                reject(err);

                            resolve(true)
                        });
                });
            }).catch((err) => {
                reject(err);
            });
    });
};
