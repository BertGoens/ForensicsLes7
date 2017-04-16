const mysql = require('mysql');
const db = require("./db");
const Promise = require('bluebird');

const TABLE = 'Group';

module.exports.getByGroupName() = function(groupname) {
    return new Promise(function (resolve, reject) {
        db.getConnection().then(function (connection) {
            let sql = `SELECT * FROM ${TABLE} WHERE name = ${connection.escape(groupname)}`;
            connection.query(sql, function (err, rows) {
                return (err ? reject(err) : resolve(rows[0]));
            });
        }).catch(function (error) {
            return reject(error);
        })
    });
}

module.exports.getAll() = function() {
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
