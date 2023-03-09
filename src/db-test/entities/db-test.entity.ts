import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Generated } from "typeorm";

/**
 * 数据库实体
 * 什么是实体？
 * 答：实体是映射到数据库表的类。
 */
@Entity()
export class DbTest {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        length: 255
    })
    name: string

    @Column({
        select: true // 查询的时候被过滤，不会返回给用户
    })  
    password: string

    @Column()
    age: number

    @CreateDateColumn({
        type: "timestamp"
    })
    createTime: Date

    @Generated('uuid')
    uuid: string

    @Column({
        type: "enum",
        enum: [1,2,3,4,5,6,7],
        default: 1
    })
    rank: number

    @Column('simple-array')
    names: string[]

    @Column({
        type: "simple-json"
    })
    phoneInfo: {
        color: string,
        mark: string,
        price: number
    }

}
