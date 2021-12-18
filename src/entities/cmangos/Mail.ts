import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { FormatMoney } from "../../web/utils/FormatMoney";
import { Characters } from "./Characters";

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
