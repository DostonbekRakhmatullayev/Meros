import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Category } from "./category.entitiy"
import { Lower } from "./lower.entitiy"

@Entity({
  name: "SubCategory",
})
export class SubCategory {
  @PrimaryGeneratedColumn("uuid", {
    name: "subCategory_id",
  })
  id: string

  @Column({
    length: 100,
    nullable: false,
  })
  sub_category_title: string

  @ManyToOne(() => Category, (category) => category.subCategory)
  category: Category

  @OneToMany(() => Lower, (lower) => lower.subCategory)
  lower: Lower[]
}
