// This file bootstraps the whole application.

import { GoldWatcher } from "./app/GoldWatcher";
import { HomeRouter } from "./web/routers/HomeRouter";
import * as express from "express";
import { IConfiguration } from "./app/interfaces/IConfiguration";


// tslint:disable-next-line: no-var-requires
const config: IConfiguration = require("./config.json");
const golderWatcher: GoldWatcher = new GoldWatcher(config);
const app: express.Application = express();
const port: number = 8888;

app.use("/", HomeRouter);

app.listen(port, () => {
    console.log(`Web-interface hosted at http://127.0.0.1:${port}/`);
});
