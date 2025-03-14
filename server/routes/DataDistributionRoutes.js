const express = require("express");
const router = express.Router();
const DataDistributionController = require("../controller/DataDistributionController");

router.post("/addData", DataDistributionController.addData);
router.get("/getListOfAgent/:aid", DataDistributionController.getListOfAgent);
router.get(
  "/getSingleListData/:id",
  DataDistributionController.getSingleListData
);
router.get("/getListCount", DataDistributionController.getListCount);

module.exports = router;
