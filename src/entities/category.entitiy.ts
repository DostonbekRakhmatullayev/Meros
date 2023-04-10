import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { SubCategory } from "./subCategory.entitiy"

@Entity({
  name: "Category",
})
export class Category {
  @PrimaryGeneratedColumn("uuid", {
    name: "category_id",
  })
  id: string

  @Column({
    length: 100,
    nullable: false,
  })
  category_title: string

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category)
  subCategory: SubCategory[]
}
