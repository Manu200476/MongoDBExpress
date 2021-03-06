const Product = require('../models/product')

exports.getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    isAuthenticated: req.isLooggedIn,
    editing: false,
  })
}

exports.postAddProduct = (req, res) => {
  const {
    title, imageUrl, price, description,
  } = req.body
  const product = new Product({
    title,
    price,
    description,
    imageUrl,
    userId: req.user,
  })
  product
    .save()
    .then(() => {
      res.redirect('/admin/products')
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect('/')
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product,
        isAuthenticated: req.isLooggedIn,
      })
    })
    .catch((err) => console.log(err))
}

exports.postEditProduct = (req, res) => {
  const {
    productId, title, price, imageUrl, description,
  } = req.body

  Product.findById(productId)
    .then((product) => {
      product.title = title
      product.price = price
      product.description = description
      product.imageUrl = imageUrl
      return product.save()
    })
    .then(() => {
      res.redirect('/admin/products')
    })
    .catch((err) => console.log(err))
}

exports.getProducts = (req, res) => {
  Product.find()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
        isAuthenticated: req.isLooggedIn,
      })
    })
    .catch((err) => console.log(err))
}

exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId
  Product.findByIdAndRemove(prodId)
    .then(() => {
      res.redirect('/admin/products')
    })
    .catch((err) => console.log(err))
}
