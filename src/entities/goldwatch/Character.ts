import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Character extends BaseEntity {

    @PrimaryGeneratedColumn()
    public guid: number;

    // @ManyToOne(type => Account, account => account.characters)
    // public account: Account;

    @Column()
    public account: number;

    @Column()
    public name: string;

    @Column()
    public money: number;

    @Column()
    public totaltime: number;

}
