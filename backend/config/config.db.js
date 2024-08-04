const mongoose = require("mongoose");
mongoose.connect(
  `${process.env.DATABASE_BASE_URL}/${process.env.DATABASE_NAME}`
);

const db = mongoose.connection;
db.once("open", () => console.log("Database was connected"));
db.on("error", (error) => {
  console.error("Connection error:", error);
});

module.exports = mongoose;
