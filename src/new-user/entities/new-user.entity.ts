import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class NewUser {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        length: 255
    })
    name: string

    @Column()  
    desc: string

    @CreateDateColumn({
        type: "timestamp"
    })
    createTime: Date
}
