import { Entity, Column, PrimaryColumn } from "typeorm";
import { FormatMoney } from "../../web/utils/FormatMoney";

@Entity()
export class Mail {

	@PrimaryColumn()
	public id: number;

	@Column()
	public sender: number;

	@Column()
	public receiver: number;

	@Column()
	public subject: string;

	@Column()
	public money: number;

	public getFormattedMoney(): string {
		return FormatMoney.format(this.money);
	}

}
