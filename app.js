const path = require('path')
const express = require('express')
const errorController = require('./controllers/error')
const { mongoConnect } = require('./util/database')
const User = require('./models/user')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use((req, res, next) => {
    User.findById()
        .then(user => {
            req.user = user
        })
        .catch(e => {
            console.log(e)
        })
    next()
})

app.use(errorController.get404)

mongoConnect(client => {
    app.listen(3000)
})