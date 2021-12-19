import { Entity, Column, BaseEntity, PrimaryColumn, getManager } from "typeorm";
import { Characters } from "../cmangos/Characters";

@Entity()
export class ServerSnapshot extends BaseEntity {

	@PrimaryColumn()
	public readonly id: number;

	@Column()
	public readonly players: number;

	@Column()
	public readonly serverMoney: number;

	@Column()
	public readonly totaltime: number;

	@Column()
	public readonly snapshottime: number;

	private readonly ONE_SECOND = 1000;

	constructor(
		players: number,
		serverMoney: number,
		totaltime: number
	) {
		super();
		this.players = players;
		this.serverMoney = serverMoney;
		this.totaltime = totaltime;
		this.snapshottime = Math.round(new Date().getTime() / this.ONE_SECOND);
	}


	public static async getASumOfAllPlayers(): Promise<ServerSnapshot> {

		// SELECT SUM(`totaltime`), SUM(`money`), AVG(`money` / `totaltime`), snapshottime FROM character_snapshot GROUP BY snapshottime;
		const players = await getManager("cmangosDB").createQueryBuilder(Characters, "characters")
			.getMany();
		let money: number = 0;
		let played: number = 0;
		for (const player of players) {
			money += player.money;
			played += player.totaltime;
		}

		return new ServerSnapshot(players.length, money, played);
	}
}
