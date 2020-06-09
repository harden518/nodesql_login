//登录接口
const express = require("express");
const users = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");

users.get("/test", (req, res) => {
  res.send({ msg: "hello world" });
});

users.post("/register", (req, res) => {
  const now = new Date();
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    created: now,
  };
  //存之前 先找
  User.findOne({ where: { email: req.body.email } })
    .then((data) => {
      if (!data) {
        //加密
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.json({ status: user.email + "registered" });
            })
            .catch((err) => {
              res.send("error:" + err);
            });
        });
      } else {
        //数据库存在
        res.json({ error: "user already exists" });
      }
    })
    .catch((err) => {
      res.send("error:" + err);
    });
});

module.exports = users;
