import express, { Express } from "express";

import cron from 'node-cron';

import { initDB } from "./db/init";
import { authenticateToken } from "./auth/controller/authenticateToken";
import { authenticateBasic } from "./auth/controller/authenticateUser";
import { stockReport } from "./stock/controller/stockReport";
import { transactionQuery } from "./transaction/controller/transactionQuery";
import { getCurrency } from "./currency/controller/getCurrency";

import { validateAuthToken, validateBasicAuth } from "./auth/validator";

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Task Scheduling
cron.schedule("0 12 * * *", function() {
  console.log("Scheduling running every 12 PM");
});

app.get("/init", initDB);

app.post("/authenticate/token", validateAuthToken(), authenticateToken);
app.post("/authenticate/basic", validateBasicAuth(), authenticateBasic);

app.get("/report/stock", stockReport);

app.post("/transaction", transactionQuery);

app.get("/currency/:country", getCurrency);

app.listen(port, () => {
  console.log(`App running at http://localhost/${port}`)
});
