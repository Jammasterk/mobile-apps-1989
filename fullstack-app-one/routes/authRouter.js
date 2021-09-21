const express = require("express");
const authRouter = express.Router();
const Auth = require("../models/authSchema");
const jwt = require("jsonwebtoken");

authRouter.post("/signup", (req, res, next) => {
  Auth.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (user) {
      res.status(403);
      return next(new Error("That email is already registered"));
    }
    const newUser = new Auth(req.body);
    newUser.save((err, savedUser) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      const token = jwt.sign(savedUser.toObject(), process.env.SECRET);
      return res.status(201).send({ token, user: savedUser });
    });
  });
});

// console.log(new Auth());

authRouter.post("/login", (req, res, next) => {
  Auth.findOne({ email: req.body.email.toLowerCase() }, (err, user) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!user) {
      res.status(403);
      return next(new Error("Username or password is incorrect"));
    }
    user.checkPassword(req.body.password, (err, isMatch) => {
      if (err) {
        res.status(403);
        return next(new Error("Username or password is incorrect"));
      }
      if (!isMatch) {
        res.status(403);
        return next(new Error("Username or password is incorrect"));
      }
      const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
      return res.status(201).send({ token, user: user.withoutPassword() });
    });
  });
});

module.exports = authRouter;
