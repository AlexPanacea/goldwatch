import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Mail {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public sender: number;

    @Column()
    public receiver: number;

    @Column()
    public subject: string;

    @Column()
    public money: number;

}
