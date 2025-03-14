const express = require("express");
const router = express.Router();
const AgentsController = require("../controller/AgentsController");

router.post("/addNewAgent", AgentsController.addNewAgent);
router.post("/loginAgent", AgentsController.loginAgent);
router.post("/deleteAgent/:aid", AgentsController.deleteAgent);
router.post("/updateAgent", AgentsController.updateAgent);
router.get("/getAllAgents", AgentsController.getAllAgents);
router.get("/getSingleAgent/:aid", AgentsController.getSingleAgent);
router.get("/getAgentCount", AgentsController.getAgentCount);

module.exports = router;
