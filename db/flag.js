const mysql = require('mysql');
const db = require("./db");
//const Promise = require('bluebird');

const TABLE = 'Flag';

function getFlagByName(flagName) {
    return new Promise(function (resolve, reject) {
        db.getConnection().then(function (connection) {
            let sql = `SELECT * FROM ${TABLE} WHERE flagname = ?`;
            let sqlData = [flagName];
            connection.query(sql, sqlData, function (err, rows, fields) {
                return (err ? reject(err) : resolve(rows[0]));
            });
        }).catch(function (error) {
            return reject(error);
        })
    });
}
module.exports.getFlagByName = getFlagByName();

module.exports.flagExists = function (flagName) {
    return new Promise(function (resolve, reject) {
        getFlagByName.then(function (row) {
            return (err ? reject(err) : resolve(rows[0].length > 0));
        })
    }).catch( (err) => {
        return reject(err);
    })
}

module.exports.getAll = function () {
            return new Promise(function (resolve, reject) {
                db.getConnection().then(function (connection) {
                    let sql = `SELECT * FROM ${TABLE}`;
                    connection.query(sql, function (err, rows) {
                        return (err ? reject(err) : resolve(rows));
                    });
                }).catch(function (error) {
                    return reject(error);
                })
            });
        }
