const mysql = require('mysql');
const db = require("./db");
const Promise = require('bluebird');

const TABLE = 'Team';

module.exports.createTeamByName = function (groupname) {
    return new Promise(function (resolve, reject) {
        db.getConnection().then(function (connection) {
            let sql = `INSERT INTO ${TABLE} (groupname) VALUES (${connection.escape(groupname)})`;
            connection.query(sql, function (err, rows) {
                return (err ? reject(err) : resolve(rows));
            });
        }).catch(function (error) {
            return reject(error);
        })
    });
}

module.exports.getByTeamName = function (groupname) {
    return new Promise(function (resolve, reject) {
        db.getConnection().then(function (connection) {
            let sql = `SELECT * FROM ${TABLE} WHERE groupname = ${connection.escape(groupname)}`;
            connection.query(sql, function (err, rows) {
                return (err ? reject(err) : resolve(rows));
            });
        }).catch(function (error) {
            return reject(error);
        })
    });
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
