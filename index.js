import express from "express";
import compression from "compression";
import helmet from "helmet";
import session from "express-session";
import { json } from "body-parser";
import { load } from "dotenv";
import path from "path";
import logger from "morgan";
import cors from "cors";

load({ path: ".env" });

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(logger("dev"));
app.use(compression());
app.use(helmet());

app.use(json());
app.use(cors());

app.listen(app.get("port"), () => {
  console.log(`App running on port ${app.get("port")}`);
});
