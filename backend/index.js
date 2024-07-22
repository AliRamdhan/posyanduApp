const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});
require("./config/config.db");

const routesChild = require("./routes/routes.child");
const routesMother = require("./routes/routes.mother");
const routesImunisation = require("./routes/routes.imunisations");
const routesBirth = require("./routes/router.birth");
const routesMotherGrowth = require("./routes/router.mothergrowth");
const routesChildrenGrowth = require("./routes/router.childrengrowth");
const routesAuth = require("./routes/router.auth");
const routesUser = require("./routes/router.user");
const routesArticle = require("./routes/router.article");

//middleware cors and parse to json
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// router
app.get("/api/v1", (req, res) => {
  res.send("Welcome API Posyandu Application");
});
app.use("/api/v1/user", routesUser);
app.use("/api/v1/children", routesChild);
app.use("/api/v1/mother", routesMother);
app.use("/api/v1/imunisation", routesImunisation);
app.use("/api/v1/auth", routesAuth);
app.use("/api/v1/birth", routesBirth);
app.use("/api/v1/growth-mother", routesMotherGrowth);
app.use("/api/v1/growth-children", routesChildrenGrowth);
app.use("/api/v1/article", routesArticle);

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `Server started on http://${process.env.HOST}:${process.env.PORT}`
  );
});
