import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Products } from "./products.entitiy"
import { Users } from "./users.entitiy"

@Entity({
  name: "Comments",
})
export class Comments {
  @PrimaryGeneratedColumn("uuid", {
    name: "comments_id",
  })
  id: string

  @ManyToOne(() => Products, (products) => products.comments)
  products: Products

  @Column()
  comment_title: string

  @ManyToOne(() => Users, (users) => users.comment)
  users: Users
}
