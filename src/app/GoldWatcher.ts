import { IConfiguration } from "./interfaces/IConfiguration";
import { getManager } from "typeorm";
import { CharacterSnapshot } from "../entities/goldwatch/CharacterSnapshot";
import { Characters } from "../entities/cmangos/Characters";
import { ServerSnapshot } from "../entities/goldwatch/ServerSnapshot";

export class GoldWatcher {

	public readonly config: IConfiguration;

	private readonly playerSnapshotInterval: number;
	private readonly serverSnapshotInterval: number;


	private readonly MS_IN_SECOND: number = 1000;
	private readonly SECONDS_IN_MIN: number = 60;

	constructor(
		config: IConfiguration
	) {
		this.config = config;
		this.playerSnapshotInterval = config.playerSnapshotInterval * this.SECONDS_IN_MIN * this.MS_IN_SECOND;
		this.serverSnapshotInterval = config.serverSnapshotInterval * this.SECONDS_IN_MIN * this.MS_IN_SECOND;
		console.log("GoldWatcher service is running");

		this.snapShotServer();
		this.snapShotPlayers(this.config);
		setInterval((() => {
			this.snapShotPlayers(this.config);
		}), this.playerSnapshotInterval);
		setInterval((() => {
			this.snapShotServer();
		}), this.serverSnapshotInterval);
	}

	/**
	 * Method runs based on configured interval.
	 * This method load data from the mangosdatabase and analyzes it.
	 * After analyzing it will store it's data into the SQLite DB.
	 */
	private async snapShotPlayers(config: IConfiguration): Promise<void> {
		const characters = await Characters.findActiveWithinTime(config.playerSnapshotInterval * this.SECONDS_IN_MIN);

		try {
			for (const char of characters) {
				await getManager("goldwatchDB").save(
					new CharacterSnapshot(
						char.guid,
						char.name,
						char.level,
						char.money,
						char.totaltime
					)
				);
			}
			console.log(`Made ${characters.length} player snapshots.`);
		} catch (e) {
			console.error(`Failed reading players: ${e}`);
			return Promise.reject(e);
		}
	}

	/**
	 * Makes a snapshot of the sum of all players, online and offline.
	 */
	private async snapShotServer(): Promise<void> {
		try {
			const serverSnapshot = await ServerSnapshot.getASumOfAllPlayers();
			getManager("goldwatchDB").save(serverSnapshot);
			console.log(`serverSnapshot saved with ${serverSnapshot.players} players.`);
			console.log(serverSnapshot);
		} catch (e) {
			console.error(`Failed reading players: ${e}`);
			return Promise.reject(e);
		}
	}

}
