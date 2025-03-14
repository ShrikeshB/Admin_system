const express = require("express");
const router = express.Router();
const AdminController = require("../controller/AdminController");

router.post("/addAdmin", AdminController.addAdmin);
router.post("/loginAdmin", AdminController.loginAdmin);


module.exports = router;
