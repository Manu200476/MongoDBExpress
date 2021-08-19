const { getDb } = require('../util/database')
const { ObjectId } = require('mongodb')

const db = getDb()

class Product{
  constructor(id, title, description, price, imageUrl){
    this.title = title
    this.description = description
    this.price = price
    this.imageUrl = imageUrl
    this._id = id ? new ObjectId(this._id) : undefined
  }

  save() {
    if (this._id) {
      return db.collections('Products')
        .updateOne({ _id: this._id }, { $set: this })
        .catch(e => console.log(e))
    }
    return db.collections('Products')
      .insertOne(this)
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

  static deleteById(prodId) {
    db.collections('Products')
      .deleteOne({ _id: new ObjectId(prodId) })
      .catch(e => console.log(e))
  }
}

module.exports = Product