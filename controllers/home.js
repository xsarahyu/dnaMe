// controllers/homeController.js

module.exports = {
  getIndex(req, res) {
    res.render('index.ejs')
  },

  getHome(req, res) {
    const user = {
      firstName: req.user.firstName
    }

    if (req.user.role === 'user') {
      res.render('home/user.ejs', { user })
    } else if (req.user.role === 'counselor') {
      res.render('home/counselor.ejs', { counselor: user })
    }
  }
}