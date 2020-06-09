const Sequzlize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  "user",
  {
    id: {
      type: Sequzlize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequzlize.STRING,
    },
    email: { type: Sequzlize.STRING },
    password: { type: Sequzlize.STRING },
    created: {
      type: Sequzlize.DATE,
      defaultValue: Sequzlize.NOW,
    },
  },
  {
    timestamps: false,
  }
);
