const express = require("express");
const router = express.Router();
const DataDistributionController = require("../controller/DataDistributionController");

// route to handle addition of list data from csv
router.post("/addData", DataDistributionController.addData);

// get all the list data of specific agent via agent ID
router.get("/getListOfAgent/:aid", DataDistributionController.getListOfAgent);

// get single distributed list data details
router.get(
  "/getSingleListData/:id",
  DataDistributionController.getSingleListData
);

// get list data count
router.get("/getListCount", DataDistributionController.getListCount);

module.exports = router;
