const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://jeet:epcKMWVB6yJnF8Q@cluster0.hciol.mongodb.net/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to MongoDB"));
db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports = db;
