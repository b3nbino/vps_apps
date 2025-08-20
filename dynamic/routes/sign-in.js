const express = require("express");
const router = express.Router();
const { catchError } = require("../lib/routeMethods");
const { body, validationResult } = require("express-validator");

//Get sign in page
router.get("/", (req, res) => {
  res.render("sign-in");
});

router.post(
  "/",
  [
    body("username")
      .isLength({ min: 1 })
      .withMessage("Please enter a username."),
    body("password")
      .isLength({ min: 1 })
      .withMessage("Please enter a password."),
  ],
  catchError(async (req, res) => {
    let { username, password } = req.body;
    let errors = validationResult(req);
    let desiredUrl = req.session.desiredUrl || "/home";
    delete req.session.desiredUrl;

    if (!errors.isEmpty()) {
      errors.array().forEach((err) => req.flash("error", err.msg));
      res.render("sign-in", { flash: req.flash() });
    } else {
      if (await res.locals.store.existingUser(username, password)) {
        req.session.username = username;
        req.session.signedIn = true;

        req.flash("success", "Signed in!");
        res.redirect(desiredUrl);
      } else {
        req.flash("error", "Invalid username or password.");
        res.render("sign-in", { flash: req.flash() });
      }
    }
  })
);

router.post("/sign-out", (req, res) => {
  delete req.session.username;
  delete req.session.signedIn;
  res.redirect("/sign-in");
});

module.exports = router;
