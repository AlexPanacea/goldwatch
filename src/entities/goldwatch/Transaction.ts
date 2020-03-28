import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import { Character } from "./Character";

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn("increment")
    public id: number;

    @Column()
    public type: number;

    @OneToOne(type => Character)
    @JoinColumn()
    public from: Character;

    @OneToOne(type => Character)
    @JoinColumn()
    public to: Character;

    @Column()
    public amount: number;

    @Column()
    public suspicion: number;

}
