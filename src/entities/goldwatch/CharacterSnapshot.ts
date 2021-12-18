import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";
import { FormatMoney } from "../../web/utils/FormatMoney";
import { FormatDateTime } from "../../web/utils/FormatDateTime";

@Entity()
export class CharacterSnapshot extends BaseEntity {

	@PrimaryColumn()
	public readonly id: number;

	@Column()
	public readonly guid: number;

	@Column()
	public readonly name: string;

	@Column()
	public readonly level: number;

	@Column()
	public readonly money: number;

	@Column()
	public readonly totaltime: number;

	@Column()
	public readonly snapshottime: number;

	private readonly ONE_SECOND = 1000;

	constructor(
		guid: number,
		name: string,
		level: number,
		money: number,
		totaltime: number
	) {
		super();
		this.guid = guid;
		this.name = name;
		this.level = level;
		this.money = money;
		this.totaltime = totaltime;
		this.snapshottime = Math.round(new Date().getTime() / this.ONE_SECOND);
	}

	public getFormattedMoney(): string {
		return FormatMoney.format(this.money);
	}

	public getFormattedTotalTime(): string {
		// tslint:disable-next-line: no-magic-numbers
		return FormatDateTime.secondsToTime(this.totaltime);
	}

	public getFormattedSnapshotTime(): string {
		return FormatDateTime.epochToDate(this.snapshottime);
	}
}
