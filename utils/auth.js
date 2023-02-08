const authjs = (req, res, next) => {
    //if the user is not logged in, redirect the user to the login page
    if (!req.session.isLoggedIn) {
      res.redirect("/login");
    } else {
      next();
    }
  };
  
  module.exports = authjs;