import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Comments } from "./comments.entitiy"
import { Korzinka } from "./kozinka.entitiy"
import { Products } from "./products.entitiy"

@Entity({
  name: "Users",
})
export class Users {
  @PrimaryGeneratedColumn("uuid", {
    name: "user_id",
  })
  id: string

  @Column({
    length: 63,
    nullable: false,
  })
  first_name: string

  @Column({
    length: 100,
    nullable: false,
  })
  last_name: string

  @Column({
    length: 100,
    nullable: false,
  })
  email: string

  @Column({
    length: 100,
    nullable: true,
  })
  phone: string

  @Column({
    length: 100,
    nullable: true,
  })
  gendry: string

  @Column({
    length: 100,
    nullable: false,
  })
  password: string

  @Column({
    length: 100,
    nullable: true,
  })
  avatar: string

  @OneToMany(() => Comments, (comment) => comment.users)
  comment: Comments[]

  @OneToMany(() => Korzinka, (korzinka) => korzinka.users)
  korzinka: Korzinka[]
}
