// This file bootstraps the whole application.

import { GoldWatcher } from "./app/GoldWatcher";
import { HomeRouter } from "./web/routers/HomeRouter";
import * as express from "express";
import { IConfiguration } from "./app/interfaces/IConfiguration";
import { createConnections } from "typeorm";
import "reflect-metadata";

(async () => {

    // tslint:disable-next-line: no-var-requires
    const config: IConfiguration = require("./config.json") as IConfiguration;

    console.log("Config loaded:");
    console.log(config);

    await createConnections([{
        name: "goldwatchDB",
        type: "sqlite",
        database: config.sqliteLocation,
        entities: [
            `${__dirname}/entities/goldwatch/*.js`
        ],
        synchronize: true,
        logging: false
    }, {
        name: "cmangosDB",
        type: "mysql",
        host: config.mysql.host,
        port: config.mysql.port,
        username: config.mysql.username,
        password: config.mysql.password,
        database: config.mysql.database,
        entities: [
            `${__dirname}/entities/cmangos/*.js`
        ],
        synchronize: false,
        logging: false
    }]).catch(error => console.error(error));

    // Ugly way of type-checking the config to the interface.
    if (!config.mangosSaveInterval || !config.sqliteLocation || !config.website) {
        console.log("Loading config failed, atleast one config not found.");
        process.exit();
    }

    const goldWatcher: GoldWatcher = new GoldWatcher(config);

    // Start express server is website setting is turned on.
    if (config.website) {
        const app: express.Application = express();
        const port: number = 8888;

        app.use("/", HomeRouter);

        app.listen(port, () => {
            console.log(`Web-interface hosted at http://127.0.0.1:${port}/`);
        });
    }
})();
