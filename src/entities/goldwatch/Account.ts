/**
 * Don't use this class untill the next version.
 */

import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Character } from "./Character";

@Entity()
export class Account {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public username: string;

    @Column({ default: "100" })
    public reputation: number;

    // @OneToMany(type => Character, character => character.account)
    // public characters: Character[];

}
