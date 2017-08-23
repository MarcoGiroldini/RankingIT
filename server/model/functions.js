let f = module.exports = {};

let admin = require('firebase-admin');
let mysql = require('mysql');

let config = require('../config/config.json');

admin.initializeApp({
    credential: admin.credential.cert(config.credential),
    databaseURL: config.firebaseDB.databaseURL
});

let pool = mysql.createPool({
    connectionLimit: process.env.DB_AZURE ? config.database.connectionLimit : config.databaseDev.connectionLimit,
    host: process.env.DB_AZURE ? config.database.host : config.databaseDev.host,
    port: process.env.DB_AZURE ? config.database.port : config.databaseDev.port,
    user: process.env.DB_AZURE ? config.database.user : config.databaseDev.user,
    password: process.env.DB_AZURE ? config.database.password : config.databaseDev.password,
    database: process.env.DB_AZURE ? config.database.database : config.databaseDev.database,
});

pool.getConnection((err, connection) => {
    if (err) throw err;
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
            if (err) reject(err);
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
