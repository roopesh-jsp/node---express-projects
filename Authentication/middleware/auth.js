module.exports = (req, res, nxt) => {
  if (!req.session.isLogedIn) {
    res.redirect("/logIn");
  }
  nxt();
};
