module.exports = function(app, passport) {

    // homepage
    app.get('/', function(req, res){
        res.render('index.ejs');
    });

    //login form
    //processing login form
    //signup form
    //processing signup form

    //showing the profile page

    app.get('/profile', isLoggedIn, function(req, res){
        res.render('profile.ejs', {
            user: req.user
        });
    });

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    //Twitter routes
    //authentication and login
    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));
};
// make sure a user is logged in
function isLoggedIn(req, res, next){
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}