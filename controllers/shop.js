const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  try {
    const products = Product.findAll()
    res.render('shop/product-list', {
      products: products,
      pageTitle: 'Listado de Productos',
      path: '/'
    })
  } catch (e) {
    console.log(e)
  }
}

exports.getProduct = (req, res, next) => {
  const { productId } = req.params
  try {
    const product = Product.findByPk(productId)
    if (!product) return res.redirect('/')
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    })
  } catch (e) {
    console.log(e)
  }
}

exports.getIndex = (req, res, next) => {
  try {
    const products = Product.findAll()
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    })
  } catch (e) {
    console.log(e)
  }
}

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      cart.getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products
          })
        })
        .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
}

exports.postCart = (req, res, next) => {
  const { productId } = req.body
  const newQuantity = 1
  let fetchedCart
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart
      cart.getProducts({ where: { id: prodId } })
    })
    .then(product => {
      const newProduct = product[0]
      if (product) {
        const newQty = newProduct.cartItem.qty + newQuantity
        return newProduct
      }
      return Product.findByPk(productId)
    })
    .then(product => {
      fetchedCart.addProduct(product, {through: {quantity: newQuantity}})
    })
    .then(() => {
        res.redirect('/cart')
    })
    .catch(e => console.log(e))
}

exports.postCartDeleteProduct = (req, res, next) => {
  const { productId } = req.body
  req.user
    .getCart()
    .then(cart => {
      cart.getProducts({where: {id: productId}})
    })
    .then(products => {
      const product = products[0]
      product.cartItem.destroy()
    })
    .then(() => {
      res.redirect('/')
    })
    .catch(e => console.log(e))
}

exports.createOrder = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      cart.getProducts()
    })
    .then(products =>
      req.user
        .createOrder()
        .then(order => {
          order.addProducts(products.map(prod => {
            prod.orderItem = { quantity: prod.cartItem.quantity }
            return prod
          }))
        })
        .catch(e => console.log(e))
    )
    .then(() => {
      res.redirect('/orders')
    })
    .catch(e => console.log(e))
}

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({include: ['products']})
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders
      })
    })
    .catch(e => console.log(e))
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}
