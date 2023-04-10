import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Comments } from "./comments.entitiy"
import { Darajasi } from "./darajasi.entitiy"
import { Korzinka } from "./kozinka.entitiy"
import { Lower } from "./lower.entitiy"

@Entity({
  name: "Products",
})
export class Products {
  @PrimaryGeneratedColumn("uuid", {
    name: "products_id",
  })
  id: string

  @Column({
    nullable: true,
  })
  protuctes_brend: string

  @Column({
    nullable: true,
  })
  protuctes_brendname: string

  @Column({
    nullable: true,
  })
  aftur: string

  @Column({
    nullable: true,
  })
  protuctes_title: string

  @Column({
    nullable: true,
  })
  protuctes_descirption: string

  @Column("decimal", {
    nullable: true,
  })
  protuctes_price: number

  @Column("decimal", { default: 0 })
  yanginarhi: number

  @Column({
    nullable: true,
  })
  protuctes_size: string

  @Column({
    nullable: true,
  })
  protuctes_razmer: string

  @Column({
    nullable: true,
  })
  protuctes_manufacturers_size: string

  @Column({
    nullable: true,
  })
  packed_weight_kg: string

  @Column({
    nullable: true,
  })
  img: string

  @Column({
    nullable: true,
  })
  protuctes_rate: string

  @Column({ default: 0 })
  chegirma: number

  @Column({ default: 0 })
  nechta_sotdi: number

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  time: string

  @ManyToOne(() => Lower, (lower) => lower.products)
  lower: Lower

  @OneToMany(() => Comments, (comments) => comments.products)
  comments: Comments[]

  @OneToMany(() => Korzinka, (korzinka) => korzinka.products)
  korzinka: Korzinka[]

  @OneToOne(() => Darajasi, (darajasi) => darajasi.products)
  darajasi: Darajasi[]
}
