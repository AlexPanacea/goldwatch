import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { FormatMoney } from "../../web/utils/FormatMoney";

@Entity()
export class CharacterSnapshot extends BaseEntity {

    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Column()
    public readonly guid: number;

    @Column()
    public readonly name: string;
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
            money: number,
            totaltime: number
    ) {
        super();
        this.guid = guid;
        this.name = name;
        this.money = money;
        this.totaltime = totaltime;
        this.snapshottime = Math.round(new Date().getTime() / this.ONE_SECOND);
    }

    public getFormattedMoney(): string {
        return FormatMoney.format(this.money);
    }
}
