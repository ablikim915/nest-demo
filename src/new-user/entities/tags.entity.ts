import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { NewUser } from "./new-user.entity";

@Entity()
export class Tags {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        length: 255
    })
    name: string

    @ManyToOne(() => NewUser) // 多对一
    userss: NewUser
}
