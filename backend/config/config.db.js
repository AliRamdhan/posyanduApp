const mongoose = require("mongoose");
// require("dotenv").config();
mongoose.connect(
  `${process.env.DATABASE_BASE_URL}/${process.env.DATABASE_NAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.once("open", () => console.log("Database was connected"));
db.on("error", (error) => {
  console.error("Connection error:", error);
});

module.exports = mongoose;
