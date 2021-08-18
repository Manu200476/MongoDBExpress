const { getDb } = require('../util/database')
const {ObjectId} = require('mongodb')
const db = getDb()

class Product{
  constructor(title, description, price, imageUrl){
    this.title = title
    this.description = description
    this.price = price
    this.imageUrl = imageUrl
  }

  save() {
    db.collections('Products')
      .insertOne(this)
      .then(result => console.log(result))
      .catch(e => console.log(e))
  }

  static findAll() {
    return db.collections('Products')
      .find()
      .toArray()
      .then(products => {
        return products
      })
      .catch(e => console.log(e))
  }

  static findByPk(prodId) {
    return db.collections('Products')
      .find({ _id: new ObjectId(prodId) })
      .next()
      .then(prod => {
        return prod
      })
      .catch(e => console.log(e))
  }
}

module.exports = Product