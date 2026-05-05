import express from 'express';
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import db from "./db.js";

const router = express.Router();

router.get("/login", (req, res) => {
    res.render("login.ejs");
})
;
router.get("/register", (req, res) => {
    res.render("register.ejs");
})

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    })
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
}));

router.post('/register', async (req, res) => {
    const username = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const checkUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if(checkUser.rows.length > 0) {
            res.redirect("/login");
        } else {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.log("Error hashing password:", err);
                } else {
                    const result = await db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", 
                        [username, email, hash]);
                    const user = result.rows[0];
                    req.login(user, (err) => {
                        console.log("success register");
                        res.redirect("/dashboard");
                    });
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
});

passport.use("local", 
    new Strategy({usernameField: "email"}, async function verify(username, password, cb) {
        try {
            const result = await db.query("SELECT * FROM users WHERE email = $1", [username]);
            if (result.rows.length > 0) {
                const user = result.rows[0];
                const hashPassword = user.password;
                bcrypt.compare(password, hashPassword, (err, isMatch) => {
                    if (err) {
                        console.log("Error comparing password:", err);
                        return cb(err);
                    } else {
                        if (isMatch) {
                            return cb(null, user);
                        } else {
                            return cb(null, false, { message: "Incorrect password" });
                        }
                    }
                });
            } else {
                return cb("user not found");
            }
        } catch (error) {
            console.log(error);
            return cb(error);
        }
    }
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

export default router;
