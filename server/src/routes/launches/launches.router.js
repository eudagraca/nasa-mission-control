const express = require("express");
const launchesRouter = express.Router();
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
} = require("../../routes/launches/launches.controller");

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);

module.exports = launchesRouter;
