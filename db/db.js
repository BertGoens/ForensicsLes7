const mysql = require('mysql');
//const Promise = require('bluebird');

const dbConfig = {
    host: '192.168.1.48',
    database: 'ForensicsLab7',
    user: 'bert',
    password: 'bert',
    connectionLimit: 100, /* default 10 */
    queueLimit: 100, /* default 0 (= unlimited) */
}

var pool = mysql.createPool(dbConfig);

pool.on('enqueue', function () {
    console.log('Waiting for available connection slot ', new Date().toLocaleString());
});

module.exports.getConnection = function() {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            return (err ? reject(err) : resolve(connection));
        })
    })
};