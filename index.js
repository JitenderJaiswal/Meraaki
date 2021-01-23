const serverless = require("serverless-http");
const express = require("express");
const app = express();
const db = require("./config/mongoose");
const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy");
const cors = require("cors");

app.use(cors());
//body parser(Middleware)
app.use(express.urlencoded({ extended: false }));
// use express router
app.use("/", require("./routes"));

module.exports.handler = serverless(app);
