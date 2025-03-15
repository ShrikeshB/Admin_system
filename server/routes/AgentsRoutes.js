const express = require("express");
const router = express.Router();
const AgentsController = require("../controller/AgentsController");

//route to handle adding of new agent
router.post("/addNewAgent", AgentsController.addNewAgent);

// route to verify the login details of agent
router.post("/loginAgent", AgentsController.loginAgent);

// route to handle the deletion of agent via agent ID
router.post("/deleteAgent/:aid", AgentsController.deleteAgent);

// route updation of agent
router.post("/updateAgent", AgentsController.updateAgent);

// route to get all the agents details
router.get("/getAllAgents/:search", AgentsController.getAllAgents);

// route to recently added 5 agents
router.get("/getLimitedAgents", AgentsController.getLimitedAgents);

// route to get single agent details
router.get("/getSingleAgent/:aid", AgentsController.getSingleAgent);

// get the count of agents
router.get("/getAgentCount", AgentsController.getAgentCount);

module.exports = router;
