const express = require("express");
const router = express.Router();
const AdminController = require("../controller/AdminController");

// route to handle addition of admin
router.post("/addAdmin", AdminController.addAdmin);

// route to handle login veriification of admin
router.post("/loginAdmin", AdminController.loginAdmin);

module.exports = router;
