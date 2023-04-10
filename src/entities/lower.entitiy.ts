import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Products } from "./products.entitiy"
import { SubCategory } from "./subCategory.entitiy"

@Entity({
  name: "Lower",
})
export class Lower {
  @PrimaryGeneratedColumn("uuid", {
    name: "lower_id",
  })
  id: string

  @Column()
  lower_title: string

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.lower)
  subCategory: SubCategory

  @OneToMany(() => Products, (products) => products.lower)
  products: Products[]
}
