module.exports = {
  protectedRoute: (req, res, next) => {
    if (req.session.currentUser) {
      next();
    } else {
      res.redirect('/login');
    }
  },
  anonRoute: (req, res, next) => {
    if (req.session.currentUser) {
      res.redirect('/login');
    } else {
      next();
    }
  },
  checkRole: role => (req, res, next) => {
    if (req.session.currentUser.role === role) {
      next();
    } else {
      res.redirect('login');
    }
  },
};
