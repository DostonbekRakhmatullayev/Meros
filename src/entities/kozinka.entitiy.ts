import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Products } from "./products.entitiy"
import { Users } from "./users.entitiy"

@Entity({
  name: "Korzinka",
})
export class Korzinka {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  zakas_soni: number

  @ManyToOne(() => Products, (products) => products.korzinka)
  @JoinColumn()
  products: Products

  @ManyToOne(() => Users, (users) => users.korzinka)
  users: Users
}
