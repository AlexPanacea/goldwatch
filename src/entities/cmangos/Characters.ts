import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, getManager } from "typeorm";
// tslint:disable: variable-name
@Entity()
export class Characters extends BaseEntity {

    @PrimaryGeneratedColumn()
    public readonly guid: number;

    // @ManyToOne(type => Account, account => account.characters)
    // public account: Account;

    @Column()
    public readonly account: number;

    @Column()
    public readonly name: string;

    @Column()
    public readonly money: number;

    @Column()
    public readonly totaltime: number;

    @Column()
    public readonly logout_time: number;

    @Column()
    public readonly online: number;

    constructor(
        guid: number,
        account: number,
        name: string,
        money: number,
        totaltime: number,
        logout_time: number,
        online: number) {
        super();
        this.guid = guid;
        this.account = account;
        this.name = name;
        this.money = money;
        this.totaltime = totaltime;
        this.logout_time = logout_time;
        this.online = online;
    }

    public static findActiveWithinTime(timeSpanSeconds: number): Promise<Characters[]> {
        // tslint:disable-next-line: no-magic-numbers
        const currentEpochSeconds = Math.round(new Date().getTime() / 1000);

        return getManager("cmangosDB").createQueryBuilder(Characters, "characters")
            .where(`characters.logout_time > ${currentEpochSeconds - timeSpanSeconds} OR online = 1`)
            .getMany();
    }
}
