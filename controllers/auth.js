exports.getLogin = (req, res) => {
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
  })
}

exports.postLogin = (req, res) => {
  req.session.isLoggedIn = true
  res.redirect('/')
}

exports.logout = (req, res) => {
  try {
    req.session.destroy()
    res.redirect('/')
  } catch (e) {
    console.log(e)
  }
}
