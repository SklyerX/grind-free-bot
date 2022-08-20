const express = require("express");
const router = express.Router();
const chalk = require("chalk");

router.use((req, res, next) => {
  console.log(`${chalk.blueBright("[Request Info]")} ${req.originalUrl} ${chalk.yellowBright("-")} ${req.method} ${chalk.yellowBright("-")} ${new Date().toISOString()}`);
  next();
});

router.get("/healthz", (req, res) => {
  res.status(200).send("Running Like Bardia on Hosein!");
});

router.post('/account', require("./createAccount"));
router.post("/loginapp", require("./loginApp.js"));
router.post("/login", require("./login.js"));
router.patch("/change/password", require("./changePswrd"));
router.patch("/change/theme", require("./changeTheme"));
router.patch("/change/notify", require("./changeNotify.js"));
router.patch("/change/codes", require("./changeCodes.js"));
router.post("/account/data", require("./getUserWithKey"));
router.post("/account/cookie", require("./checkCookie"));

module.exports = router;