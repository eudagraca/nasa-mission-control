const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://nasa-api:RyzQ5r8c1ialNqqR@nasa-project.rqqkhgd.mongodb.net/nasa?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("Mongo db connection established!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});
async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect(){
    await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisconnect };
