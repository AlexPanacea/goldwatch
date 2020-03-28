import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Account } from "./Account";

@Entity()
export class Character {

    @PrimaryGeneratedColumn()
    public guid: number;

    @ManyToOne(type => Account, account => account.characters)
    public account: Account;

    @Column()
    public name: string;

    @Column()
    public money: number;

    @Column()
    public playingTime: number;

}
