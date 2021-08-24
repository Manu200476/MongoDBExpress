const path = require('path')

const express = require('express')
const mongoose = require('mongoose')

const session = require('express-session')
const errorController = require('./controllers/error')
const User = require('./models/user')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const authRoutes = require('./routes/auth')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  User.findById('5bab316ce0a7c75f783cb8a8')
    .then((user) => {
      req.user = user
      next()
    })
    .catch((err) => console.log(err))
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(authRoutes)

app.use(errorController.get404)

app.use(session({
  secret: 'vuofj',
  reseave: false,
  saveUninitialized: false,
}))

mongoose
  .connect(
    'mongodb+srv://manu:<password>@appnodejs.8yjph.mongodb.net/myFirstDatabase?retryWrites=true&w=majorityy',
  )
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const newUser = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: [],
          },
        })
        newUser.save()
      }
    })
    app.listen(3000)
  })
  .catch((err) => {
    console.log(err)
  })
