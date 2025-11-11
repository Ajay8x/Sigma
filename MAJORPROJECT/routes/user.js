const express = require('express');
const router = express.Router();
const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const {saveRedirectUrl} = require('../middleware.js');

// SIGNUP FORM
router.get('/signup', (req, res) => {
  res.render('users/signup.ejs');
});



// SIGNUP LOGIC
router.post('/signup', wrapAsync(async (req, res) => {
  try {
    let { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    // sign in the user after registration
    req.login(registeredUser, err => {
      if (err) return next(err);
      
        req.flash('success', 'Signup Successfully  '); 
    res.redirect('/listings');
  
  });


  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/login');
  }
}));



// LOGIN FORM
router.get('/login', (req, res) => {
  res.render('users/login.ejs');
});



// LOGIN LOGIC
router.post('/login', saveRedirectUrl,
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login'
  }),
  (req, res) => {
    req.flash('success', 'Welcome Back! you have successfully logged in');

    let redirectUrl = res.locals.redirectUrl || '/listings';  // ✅ Use stored URL or fallback
    // delete req.session.redirectUrl; // ✅ Clear after use
    return res.redirect(redirectUrl);
  }
);




router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {  
      return next(err);
    } 
    req.flash('success', 'You have logged out successfully');
    res.redirect('/listings');
  } 
);
}); 


module.exports = router;
