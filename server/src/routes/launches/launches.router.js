const express = require("express");
const launchesRouter = express.Router();
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch
} = require("../../routes/launches/launches.controller");

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);
launchesRouter.delete("/:id", httpAbortLaunch);

module.exports = launchesRouter;
