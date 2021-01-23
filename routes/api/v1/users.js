const express = require("express");
const router = express.Router();
const passport = require("passport");
const usersApi = require("../../../controllers/api/v1/users_api");

router.get("/", usersApi.home);
router.post("/signup", usersApi.create);
router.post("/login", usersApi.create_session);
router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  usersApi.updateprofile
);
router.get(
  "/allUsers",
  passport.authenticate("jwt", { session: false }),
  usersApi.getallUsers
);

module.exports = router;
