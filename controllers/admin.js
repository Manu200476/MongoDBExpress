const Product = require('../models/product')
const { ObjectId } = require('mongodb')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  })
}

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body
  const product = new Product(title, description, price, imageUrl)

  try {
    product.save()
  } catch (e) {
    console.log(e)
  }
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  const { productId } = req.params
  if (!editMode) return res.redirect('/')

  try {
    const product = Product.findByPk(productId)
    if (!product) return res.redirect('/')
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product
    })
  } catch (e) {
    console.log(e)
  }
}

exports.postEditProduct = (req, res, next) => {
  const { productId, title, price, imageUrl, description } = req.body
  const product = new Product(new ObjectId(productId), title, price, imageUrl, description)

  try{
    product.save()
    res.redirect('/admin/products')
  } catch (e) {
    console.log(e)
  }
}

exports.getProducts = (req, res, next) => {
  try {
    const products = Product.findAll()
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    })
  } catch (e) {
    console.log(e)
  }
}

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body
  try {
    Product.deleteById(productId)
    res.redirect('/admin/products')
  } catch (e) {
    console.log(e)
  }
}
