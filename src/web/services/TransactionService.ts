import { getManager, SelectQueryBuilder } from "typeorm";
import { CharacterSnapshot } from "../../entities/goldwatch/CharacterSnapshot.js";
import { ITransactionContent, ITransactionEntry } from "../interfaces/ITransactionsContent.js";

export class TransactionsService {

	public async renderedPage(): Promise<ITransactionContent> {

		const amountOfSnapshots = 5;
		const magicNumber = 25;
		const magicNumberDos = 3600;
		const magicNumberTres = 1000;
		const aHundredPercent = 100;
		const secondsSinceEpoch = Math.round(new Date().getTime() / magicNumberTres);

		const characters: CharacterSnapshot[] = await getManager("goldwatchDB")
			.query(`SELECT *
		FROM (
			SELECT id, guid, name, level, money, snapshottime, totaltime, DENSE_RANK() OVER (PARTITION BY "guid" ORDER BY id) as r
			FROM character_snapshot
		) as t
		WHERE t.r <= 5 LIMIT 25`);

		const snapShotSummary: Map<number, ITransactionEntry> = new Map();

		for (const character of characters) {
			if (!snapShotSummary.has(character.guid)) {
				snapShotSummary.set(character.guid, { ...character, change: 0, snapshots: [] });
			}

			snapShotSummary.get(character.guid).snapshots.push({ snapshottime: character.snapshottime, totaltime: character.totaltime, money: character.money });

			if (snapShotSummary.get(character.guid).snapshots.length === amountOfSnapshots) {
				const earliest = snapShotSummary.get(character.guid).snapshots.reduce((prev, curr) => prev.snapshottime < curr.snapshottime ? prev : curr);
				const latest = snapShotSummary.get(character.guid).snapshots.reduce((prev, curr) => prev.snapshottime > curr.snapshottime ? prev : curr);
				snapShotSummary.get(character.guid).change = Math.round((latest.money-earliest.money)/latest.money*aHundredPercent * aHundredPercent) / aHundredPercent;
			}
		}

		// console.log(JSON.stringify(snapShotSummary.entries));
		console.log(JSON.stringify([...snapShotSummary.entries()], null, amountOfSnapshots));

		return Promise.resolve({ "transactions":  Array.from(snapShotSummary.values()) });
	}
}
