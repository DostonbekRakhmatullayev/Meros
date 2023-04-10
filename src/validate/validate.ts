import Joi from "joi"
export const category = Joi.object().keys({
  category_title: Joi.string().required().max(100).min(2),
})

export const subCategory = Joi.object().keys({
  categoryId: Joi.string().required(),
  sub_category_title: Joi.string().required().max(100).min(2),
})

export const subCategory_patch = Joi.object().keys({
  sub_category_title: Joi.string().max(100).min(2),
  categoryId: Joi.string(),
})

// sub_category_title, category

export const lower_joi = Joi.object().keys({
  lower_title: Joi.string().required().max(100).min(2),
  subCategoryId: Joi.string().required(),
})

export const lower_patch = Joi.object().keys({
  lower_title: Joi.string().max(100).min(2),
  subCategoryId: Joi.string(),
})

export const products_joi = Joi.object().keys({
  protuctes_brend: Joi.string(),
  protuctes_brendname: Joi.string(),
  protuctes_descirption: Joi.string(),
  protuctes_price: Joi.number(),
  protuctes_size: Joi.string(),
  protuctes_razmer: Joi.string(),
  protuctes_manufacturers_size: Joi.string(),
  packed_weight_kg: Joi.string(),
  lowerId: Joi.string(),
  protuctes_title: Joi.string(),
  aftur: Joi.string(),
})

export const users_joi = Joi.object().keys({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
})

export const login_joi = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
})
export const users_pacht = Joi.object().keys({
  first_name: Joi.string(),
  last_name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  gendry: Joi.string(),
  password: Joi.string(),
})

export const comments = Joi.object().keys({
  comment_title: Joi.string().required(),
  productsId: Joi.string().required(),
})

export const comments_put = Joi.object().keys({
  comment_title: Joi.string(),
})

export const zakas = Joi.object().keys({
  productsId: Joi.string().required(),
  soni: Joi.number().required(),
})

export const chegirma = Joi.object().keys({
  chegirma: Joi.number().required(),
})

export const darajasi_joi = Joi.object().keys({
  star: Joi.number().required(),
})

export const category_patch = Joi.object().keys({
  category_title: Joi.string().required(),
})
