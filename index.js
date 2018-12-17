const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const logger = require("morgan");
const cors = require("cors");

const Database = require("./config/database");
const routes = require("./app/routes");

dotenv.load({ path: ".env" });

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(logger("dev"));
app.use(compression());
app.use(helmet());

app.use(bodyParser.json());
app.use(cors());

Database.connect();

app.use("/api", routes);

app.listen(app.get("port"), () => {
  console.log(`App running on port ${app.get("port")}`);
});
