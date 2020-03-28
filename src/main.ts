// This file bootstraps the whole application.

import { GoldWatcher } from "./app/GoldWatcher";
import { HomeRouter } from "./web/routers/HomeRouter";
import * as express from "express";
import { IConfiguration } from "./app/interfaces/IConfiguration";
import { createConnection } from "typeorm";

(async () => {

    createConnection({
        type: "sqlite",
        database: "database.db",
        entities: [
            `${__dirname}/entities/*.js`
        ],
        synchronize: true,
        logging: false
    }).then(connection => {
        // Do stuff.
    }).catch(error => console.log(error));

    // tslint:disable-next-line: no-var-requires
    const config: IConfiguration = require("./config.json") as IConfiguration;
    // Ugly way of type-checking the config to the interface.
    if (!config.mangosSaveInterval || !config.sqliteLocation || !config.website) {
        console.log("Loading config failed, atleast one config not found.");
        process.exit();
    }

    const goldWatcher: GoldWatcher = new GoldWatcher(config);

    // Start express server is website setting is turned on.
    if (goldWatcher.config.website) {
        const app: express.Application = express();
        const port: number = 8888;

        app.use("/", HomeRouter);

        app.listen(port, () => {
            console.log(`Web-interface hosted at http://127.0.0.1:${port}/`);
        });
    }
})();
