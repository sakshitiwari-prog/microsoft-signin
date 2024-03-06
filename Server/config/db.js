const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Chat-App");
  } catch {
    console.log("error occured while connecting");
  }
}
main();
