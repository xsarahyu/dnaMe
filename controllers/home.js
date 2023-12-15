// controllers/homeController.js

exports.getIndex = (req, res) => {
  res.render('index.ejs')
}

exports.getHome = (req, res) => {
  const user = {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email
  }

  if (req.user.role === 'user') {
    res.render('home/user.ejs', { user })
  } else if (req.user.role === 'counselor') {
    res.render('home/counselor.ejs', { counselor: user })
  }
}