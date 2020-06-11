//登录接口
const express = require("express");
const users = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

process.env.SECRET_KEY = "secret";

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

users.post("/login", (req, res) => {
  //得到数据 去表里查
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      //查到用户
      if (user) {
        //密码匹配
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // res.send("登录成功");
          //生成token
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });
          res.send(token);
        } else {
          res.send("密码错误");
        }
      } else {
        res.status(400).json({
          error: "用户不存在",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
});

module.exports = users;
