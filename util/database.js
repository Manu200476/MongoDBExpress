const { Module } = require('module')
const { MongoClient } = require('mongodb')

let _db

const mongoConnect = MongoClient.connect('mongodb+srv://manu:<password>@appnodejs.8yjph.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(client => {
        _db = client.db()
        callback(client)
    })
    .catch(error => console.log(error))

const getDb = () => { _db ? _db : 'No hay una BBDD' }

module.exports = {mongoConnect, getDb}