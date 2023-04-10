import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Products } from "./products.entitiy"

@Entity({
  name: "Darajasi",
})
export class Darajasi {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  star: number

  @Column()
  increment: number

  @Column("decimal", {
    nullable: true,
    default: 0,
  })
  ortachas: number

  @OneToOne(() => Products, (products) => products.darajasi)
  @JoinColumn()
  products: Products
}
