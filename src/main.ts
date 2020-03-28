// This file bootstraps the whole application.

import { GoldWatcher } from "./app/GoldWatcher";
import { HomeRouter } from "./web/routers/HomeRouter";
import * as express from "express";
import { IConfiguration } from "./app/interfaces/IConfiguration";
import { createConnections } from "typeorm";
import "reflect-metadata";

(async () => {

    createConnections([{
        name: "goldwatchDB",
        type: "sqlite",
        database: "database.db",
        entities: [
            `${__dirname}/entities/goldwatch/*.js`
        ],
        synchronize: true,
        logging: false
    }, {
        name: "cmangosDB",
        type: "mysql",
        host: "192.168.1.16",
        port: 3306,
        username: "goldwatcher",
        password: "goldwatch",
        database: "wotlkcharacters",
        entities: [
            `${__dirname}/entities/cmangos/*.js`
        ],
        synchronize: false,
        logging: false
    }]).catch(error => console.log(error));

    // tslint:disable-next-line: no-var-requires
    const config: IConfiguration = require("./config.json") as IConfiguration;
    // Ugly way of type-checking the config to the interface.
    if (!config.mangosSaveInterval || !config.sqliteLocation || !config.website) {
        console.log("Loading config failed, atleast one config not found.");
        process.exit();
    }

    const goldWatcher: GoldWatcher =
    new GoldWatcher(config);

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
