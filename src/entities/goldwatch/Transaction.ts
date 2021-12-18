import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from "typeorm";
@Entity()
export class Transaction extends BaseEntity {

	@PrimaryGeneratedColumn()
	public readonly id: number;

	@Column()
	public readonly to: number;

	@Column()
	public readonly from: number;

	@Column()
	public readonly amount: number;

	@Column()
	public readonly type: string;

}
