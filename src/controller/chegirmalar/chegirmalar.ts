import { NextFunction, Request, Response } from "express"
import { number } from "joi"
import { AppDataSource } from "../../config/config"
import { Products } from "../../entities/products.entitiy"
import { ErrorHandling } from "../../exceptions/error.handling"

const CHEGIRMA_GET = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await AppDataSource.getRepository(Products)
      .createQueryBuilder()
      .orderBy("Products.chegirma", "DESC")
      .getMany()

    res.status(200).json({
      status: 200,
      message: "Succsseful",
      data: products,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as string, 400))
  }
}

const CHEGIRMA_PUT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { chegirma } = req.result as any

    if (chegirma < 0 || 100 <= chegirma) {
      return next(new ErrorHandling("Iltimos 1 dan katda va 100 dan kichik son kiriting", 400))
    }

    const products = await AppDataSource.getRepository(Products).find({
      where: { id: id },
    })

    const asd = [] as any
    const aa = products.filter((e) => {
      if (e.protuctes_price) {
        asd.push(e.protuctes_price)
        return e.protuctes_price
      }
    })

    const aaaa = +((asd[0] * (100 - chegirma)) / 100).toFixed(2)

    const chegirmalar = await AppDataSource.getRepository(Products)
      .createQueryBuilder()
      .update(Products)
      .set({ chegirma: chegirma, yanginarhi: aaaa })
      .where("id = :id", { id: id })
      .execute()
      .catch((error) => next(new ErrorHandling(error.message as string, 403)))

    res.status(200).json({
      status: 201,
      message: "Succcessful",
      data: `${aaaa} yangi narxi`,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as string, 400))
  }
}

const CHEGIRMA_DELETE = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const chegirma = 0
    const yanginarhi = 0

    const chegirmalar = await AppDataSource.getRepository(Products)
      .createQueryBuilder()
      .update(Products)
      .set({ chegirma: chegirma, yanginarhi })
      .where("id = :id", { id: id })
      .execute()
      .catch((error) => next(new ErrorHandling(error.message as string, 403)))

    res.status(200).json({
      status: 200,
      message: "Successful",
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as string, 400))
  }
}

export { CHEGIRMA_PUT, CHEGIRMA_DELETE, CHEGIRMA_GET }
