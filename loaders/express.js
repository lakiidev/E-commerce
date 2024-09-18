const cors = require("cors");
const session = require("express-session");
const express = require("express");
const { SESSION_SECRET } = require("../config");

module.exports = (app) => {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.set("trust proxy", 1);

  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: "lax",
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );

  return app;
};
