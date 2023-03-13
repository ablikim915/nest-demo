import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from "typeorm";
import { Tags } from "./tags.entity";

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

    @OneToMany(() => Tags, (tags) => tags.userss) // 一对多的方式关联tags表
    tagsss: Tags[]
}
