// This file bootstraps the whole application.
// tslint:disable: no-magic-numbers
import { GoldWatcher } from "./app/GoldWatcher.js";
import { HomeRouter } from "./web/routers/HomeRouter.js";
import express from "express";
import { IConfiguration } from "./app/interfaces/IConfiguration.js";
import { createConnections, ReturningStatementNotSupportedError } from "typeorm";
import { AboutRouter } from "./web/routers/AboutRouter.js";
import "reflect-metadata";
import { MailRouter } from "./web/routers/MailRouter.js";
import { TransactionsRouter } from "./web/routers/TransactionsRouter.js";
// import JsonConfig from './config.json';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

(async () => {
	// tslint:disable-next-line
	const __filename = fileURLToPath(import.meta.url);
	// tslint:disable-next-line
	const __dirname = path.dirname(__filename);

	const rawdata = fs.readFileSync(`${__dirname}\\config.json`);
	const config: IConfiguration = JSON.parse(rawdata.toString());

	console.log("Config loaded:");
	console.log(__dirname);
	console.log(config);
	console.log(`${__dirname}\\entities\\goldwatch\\*.js`);

	await createConnections([{
		name: "goldwatchDB",
		type: "sqlite",
		database: config.sqlite.location,
		entities: [
			`${__dirname}\\entities\\goldwatch\\CharacterSnapshot.js`,
			`${__dirname}\\entities\\goldwatch\\Transaction.js`
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
			`${__dirname}\\entities\\cmangos\\*.js`
		],
		synchronize: false,
		logging: false
	}]).catch(error => console.error(error));

	// Ugly way of type-checking the config to the interface.
	if (!config.mangosSaveInterval || !config.sqlite.location || !config.website) {
		console.log("Loading config failed, atleast one config not found.");
		process.exit();
	}

	const goldWatcher: GoldWatcher = new GoldWatcher(config);

	// Start express server is website setting is turned on.
	if (config.website) {
		const app: express.Application = express();
		const port: number = 8888;

		app.use(express.static("static"));
		app.set("view engine", "pug");
		app.use("/", HomeRouter);
		app.use("/mail", MailRouter);
		app.use("/transactions", TransactionsRouter);
		app.use("/about", AboutRouter);

		app.listen(port, () => {
			console.log(`Web-interface hosted at http://127.0.0.1:${port}/`);
		});
	}
})();
