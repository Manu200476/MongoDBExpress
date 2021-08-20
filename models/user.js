const { getDb } = require('../util/database')
const { ObjectId } = require('mongodb')

const db = getDb()

class User{
  constructor(id, name, email, cart) {
    this._id = id
    this.name = name
    this.email = email
    this.cart = cart
  }

  save() {
    return db
      .collections('users')
      .insertOne(this)
  }
  
  addToCart(product) {
    let updatedCart = { items: [{ ...product, quantity: 1 }] }
    return db
      .collections('users')
      .updateOne({_id: new ObjectId(this._id)}, {$set: {cart: updatedCart}})
      .catch(e => {
        console.log(e)
      })
  }
  
  static findById(id) {
    return db
      .collections('users')
      .findOne({ _id: new ObjectId(id) })
      .next()
      .then(user => {
        return user
      })
      .catch(e => console.log(e))
  }
}

module.exports = User