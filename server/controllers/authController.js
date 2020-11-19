// Redirects to user page - only called if authentication is successful
exports.login = (req, res) => {
  res.redirect('/user');
};

// Destroys browser cookie and ends session, native to passport
exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

// Returns current user object
exports.currentUser = (req, res) => {
  res.send(req.user);
};
