const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    // check if json web token exists & is verified
    if(token){
        jwt.verify(token, process.env.AUTH_SECRETE, (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/');
            }else{
                console.log(decodedToken);
                next();
            }
        });
    }else{
        res.redirect('/');
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.AUTH_SECRETE, async (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            }else{
                console.log(decodedToken);
                let user = await User.findOne({
                    where: {
                        id: decodedToken.id
                    }
                });
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}

const redirectAfterLogin = (req, res, next) => {
    // Check if the user is authenticated
    if (req.session.user) {
        // Get the previous URL from the referer header or set a default dashboard URL
        const redirectUrl = req.header('Referer') || '/auth/dashboard';

        // Redirect the user to the previous page or dashboard
        return res.redirect(redirectUrl);
    }

    // If not authenticated, proceed to the next middleware or route
    next();
}

module.exports = { requireAuth, checkUser, redirectAfterLogin };