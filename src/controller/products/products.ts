import { NextFunction, Request, Response } from "express"
import { json } from "stream/consumers"
import { AppDataSource } from "../../config/config"
import { Client } from "../../config/redis"
import { Products } from "../../entities/products.entitiy"
import { Users } from "../../entities/users.entitiy"
import { ErrorHandling } from "../../exceptions/error.handling"
import { img } from "../../types/multer"

const PRODUCTS_RETING = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cilint = await Client()
    const ones = await cilint?.get("sotilgani")

    if (!ones) {
      const product = await AppDataSource.getRepository(Products)
        .find({
          relations: { darajasi: true },
          order: { nechta_sotdi: "DESC" },
          select: {
            chegirma: true,
            darajasi: { ortachas: true },
            protuctes_brend: true,
            protuctes_price: true,
            img: true,
            protuctes_brendname: true,
            yanginarhi: true,
            time: true,
          },
        })
        .catch((error) => next(new ErrorHandling(error.message as string, 400)))

      await cilint?.setEx("sotilgani", 15, JSON.stringify(product))

      res.status(200).json({
        status: 200,
        message: "Succsseful",
        data: product,
      })
    }

    if (ones) {
      res.status(200).json({
        status: 200,
        message: "Succsseful",
        data: JSON.parse(ones),
      })
    }
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

const PRODUCTS_REYTING = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cilint = await Client()
    const reyting = await cilint?.get("reyting")

    if (!reyting) {
      const product = await AppDataSource.getRepository(Products).find({
        relations: { darajasi: true },
        order: { darajasi: { ortachas: "ASC" } },
        select: {
          chegirma: true,
          darajasi: { ortachas: true },
          protuctes_brend: true,
          protuctes_price: true,
          img: true,
          protuctes_brendname: true,
          yanginarhi: true,
          time: true,
        },
      })

      await cilint?.setEx("reyting", 15, JSON.stringify(product))

      res.status(200).json({
        status: 200,
        message: "Succsseful",
        data: product,
      })
    }

    if (reyting) {
      res.status(200).json({
        status: 200,
        message: "Succsseful",
        data: JSON.parse(reyting),
      })
    }
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

const PRODUCTS_TIME = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cilint = await Client()
    const time = await cilint?.get("time")

    if (!time) {
      const product = await AppDataSource.getRepository(Products)
        .find({
          relations: { darajasi: true },
          order: { time: "DESC" },
          select: {
            chegirma: true,
            darajasi: { ortachas: true },
            protuctes_brend: true,
            protuctes_price: true,
            img: true,
            protuctes_brendname: true,
            yanginarhi: true,
            time: true,
          },
        })
        .catch((error) => next(new ErrorHandling(error.message as string, 400)))

      await cilint?.setEx("time", 15, JSON.stringify(product))

      res.status(200).json({
        status: 200,
        message: "Succsseful",
        data: product,
      })
    }

    if (time) {
      res.status(200).json({
        status: 200,
        message: "Succsseful",
        data: JSON.parse(time),
      })
    }
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

const CHEAP_ONES = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cilint = await Client()
    const ones = await cilint?.get("ones")

    if (!ones) {
      const product = await AppDataSource.getRepository(Products)
        .find({
          relations: { darajasi: true },
          order: { protuctes_price: "ASC" },
          select: {
            chegirma: true,
            darajasi: { ortachas: true },
            protuctes_brend: true,
            protuctes_price: true,
            img: true,
            protuctes_brendname: true,
            yanginarhi: true,
            time: true,
          },
        })
        .catch((error) => next(new ErrorHandling(error.message as string, 400)))

      await cilint?.setEx("ones", 15, JSON.stringify(product))

      res.status(200).json({
        status: 200,
        message: "Succsseful",
        data: product,
      })
    }

    if (ones) {
      res.status(200).json({
        status: 200,
        message: "Succsseful",
        data: JSON.parse(ones),
      })
    }
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

const PRODUCTS_GET_ONE = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const cilint = await Client()
    const product = await cilint?.get("one")

    if (!product) {
      const find_product = await AppDataSource.getRepository(Products)
        .findOne({
          where: { id: id },
          relations: {
            darajasi: true,
          },
          select: {
            darajasi: {
              ortachas: true,
            },
          },
        })
        .catch((error) => next(new ErrorHandling(error.message, 400)))

      await cilint?.setEx("one", 15, JSON.stringify(find_product))

      res.status(200).json({
        status: 200,
        message: "Succsseful",
        data: find_product,
      })
    }

    if (product) {
      res.status(200).json({
        status: 200,
        message: "Succsseful",
        data: JSON.parse(product),
      })
    }
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}
const PRODUCTS_GET = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cilint = await Client()
    const product = await cilint?.get("products_get")

    const { take, skip } = req.query as any
    const page = take ? take : 1
    const limit = skip ? skip : 10

    const pag = (page - 1) * limit
    const lim = page * limit

    if (!product) {
      const product = await AppDataSource.getRepository(Products).find({
        relations: { darajasi: true },
        select: {
          chegirma: true,
          darajasi: { ortachas: true },
          protuctes_brend: true,
          protuctes_price: true,
          img: true,
          protuctes_brendname: true,
          yanginarhi: true,
        },
      })
      const products = await AppDataSource.getRepository(Products)
        .find({
          relations: { darajasi: true },
          select: {
            chegirma: true,
            darajasi: { ortachas: true },
            protuctes_brend: true,
            protuctes_price: true,
            img: true,
            protuctes_brendname: true,
            yanginarhi: true,
          },
        })
        .catch((error) => next(new ErrorHandling(error.message as string, 400)))

      const maxsulotlar = product.slice(pag, lim)

      await cilint?.setEx("products_get", 15, JSON.stringify(products))

      res.status(200).json({
        status: 200,
        message: "Succsseful",
        data: maxsulotlar,
      })
    }

    if (product) {
      const maxsulot = JSON.parse(product)
      console.log(pag, lim)

      const maxsulotlar = maxsulot.slice(pag, lim)

      console.log(maxsulotlar)

      if (!maxsulotlar.length) {
        return next(new ErrorHandling("Pagination is not fount", 400))
      }
      res.status(200).json({
        status: 200,
        message: "Succsseful",
        data: maxsulotlar,
      })
    }
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

const PRODUCTS_GET_ID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const cilint = await Client()
    const category = await cilint?.get("product")

    if (!category) {
      const products = await AppDataSource.getRepository(Products)
        .find({
          where: { lower: { id: id }, darajasi: true },
          relations: { darajasi: true },
          select: {
            chegirma: true,
            darajasi: { ortachas: true },
            protuctes_brend: true,
            protuctes_price: true,
            img: true,
            protuctes_brendname: true,
            yanginarhi: true,
          },
        })
        .catch((error) => next(new ErrorHandling(error.message as string, 400)))

      await cilint?.setEx("product", 15, JSON.stringify(products))

      res.status(200).json({
        status: 200,
        message: "Succsseful",
        data: products,
      })
    }
    if (category) {
      res.status(200).json({
        status: 200,
        message: "Succsseful",
        data: JSON.parse(category),
      })
    }
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

const PRODUCTS_POST = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      protuctes_brend,
      protuctes_brendname,
      protuctes_descirption,
      protuctes_price,
      protuctes_size,
      protuctes_razmer,
      protuctes_manufacturers_size,
      packed_weight_kg,
      protuctes_title,
      lowerId,
      aftur,
    } = req.result
    const { filename } = req.file as img
    const lower = lowerId as any
    const img = filename
    const products = await AppDataSource.getRepository(Products)
      .createQueryBuilder()
      .insert()
      .into(Products)
      .values({
        aftur,
        protuctes_brend,
        protuctes_brendname,
        protuctes_descirption,
        protuctes_price,
        protuctes_size,
        protuctes_razmer,
        protuctes_manufacturers_size,
        packed_weight_kg,
        protuctes_title,
        img,
        lower,
      })
      .execute()
      .catch((error) => next(new ErrorHandling(error.message, 400)))

    res.status(200).json({
      status: 201,
      message: "Succsseful",
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

const PRODUCTS_PATCH = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const {
      protuctes_brend,
      protuctes_brendname,
      protuctes_descirption,
      protuctes_price,
      protuctes_size,
      protuctes_razmer,
      protuctes_manufacturers_size,
      packed_weight_kg,
      protuctes_title,
      lowerId,
      aftur,
    } = req.result

    const lower = lowerId as any
    const users = await AppDataSource.getRepository(Products)
      .createQueryBuilder()
      .update(Products)
      .set({
        protuctes_brend,
        protuctes_brendname,
        protuctes_descirption,
        protuctes_price,
        protuctes_size,
        protuctes_razmer,
        protuctes_manufacturers_size,
        packed_weight_kg,
        protuctes_title,
        lower,
        aftur,
      })
      .where("id = :id", { id: id })
      .execute()
      .catch((error) => next(new ErrorHandling(error.message as string, 400)))

    res.status(200).json({
      message: "Succcessful",
      status: 201,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

const PRODUCTS_DELETE = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const category = await AppDataSource.getRepository(Products)
      .createQueryBuilder()
      .delete()
      .from(Products)
      .where("id = :id", { id: id })
      .execute()
      .catch((error) => next(new ErrorHandling(error.message, 400)))

    res.status(200).json({
      status: 200,
      message: "Successful",
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as string, 500))
  }
}

export {
  PRODUCTS_RETING,
  PRODUCTS_REYTING,
  PRODUCTS_POST,
  PRODUCTS_TIME,
  CHEAP_ONES,
  PRODUCTS_GET_ONE,
  PRODUCTS_GET_ID,
  PRODUCTS_PATCH,
  PRODUCTS_DELETE,
  PRODUCTS_GET,
}
