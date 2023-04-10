import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../../config/config"
import { Client } from "../../config/redis"
import { Lower } from "../../entities/lower.entitiy"
import { ErrorHandling } from "../../exceptions/error.handling"

const LOWER_GET = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const lower = await AppDataSource.getRepository(Lower)
      .find({
        where: { subCategory: { id: id } },
      })
      .catch((error) => next(new ErrorHandling(error.message, 400)))

    res.status(200).json({
      ststus: 200,
      message: "Successful",
      data: lower,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as string, 500))
  }
}

const LOWERS_GET = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lower = await AppDataSource.getRepository(Lower)

      .find({
        relations: { products: true },
        select: {
          id: true,
          lower_title: true,
          products: {
            chegirma: true,
            protuctes_price: true,
            img: true,
            darajasi: true,
            protuctes_brendname: true,
            yanginarhi: true,
          },
        },
      })
      .catch((error) => next(new ErrorHandling(error.message, 400)))

    res.status(200).json({
      ststus: 200,
      message: "Successful",
      data: lower,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as string, 500))
  }
}

const LOWER_POST = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { lower_title, subCategoryId } = req?.result as any

    const subCategory: any = subCategoryId

    const subCategorys = await AppDataSource.getRepository(Lower)
      .createQueryBuilder()
      .insert()
      .into(Lower)
      .values({ lower_title, subCategory })
      .execute()
      .catch((error) => next(new ErrorHandling(error.message as string, 400)))
    res.status(200).json({
      ststus: 200,
      message: "Successful",
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as string, 500))
  }
}

const LOWER_DELETE = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    console.log(id)

    const lower = await AppDataSource.getRepository(Lower)
      .createQueryBuilder()
      .delete()
      .from(Lower)
      .where("lower_id = :lower_id", { lower_id: id })
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

const LOWER_PATCH = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { lower_title, subCategoryId } = req.result as any

    const users = await AppDataSource.getRepository(Lower)
      .createQueryBuilder()
      .update(Lower)
      .set({ lower_title, subCategory: subCategoryId })
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

export { LOWER_POST, LOWER_DELETE, LOWER_PATCH, LOWERS_GET, LOWER_GET }
