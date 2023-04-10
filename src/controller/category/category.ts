import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../../config/config"
import { Client } from "../../config/redis"
import { Category } from "../../entities/category.entitiy"
import { ErrorHandling } from "../../exceptions/error.handling"

const CATEGORY_GET = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cilint = await Client()
    const category = await cilint?.get("category")

    if (!category) {
      const categorys = await AppDataSource.getRepository(Category)
        .find({
          relations: { subCategory: true },
        })
        .catch((error) => next(new ErrorHandling(error.message as string, 400)))

      await cilint?.setEx("category", 15, JSON.stringify(categorys))

      return res.json({
        ststus: 200,
        message: "Successful",
        data: categorys,
      })
    }
    if (category) {
      res.json({
        ststus: 200,
        message: "Successful",
        data: JSON.parse(category),
      })
    }
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as string, 500))
  }
}

const CATEGORY_POST = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category_title } = req.result

    console.log(category_title)

    const category = await AppDataSource.getRepository(Category)
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values({ category_title })
      .execute()
      .catch((error) => next(new ErrorHandling(error.message, 400)))
    res.status(200).json({
      ststus: 200,
      message: "Successful",
      data: category,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as string, 500))
  }
}

const CATEGORY_DELETE = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const category = await AppDataSource.getRepository(Category)
      .createQueryBuilder()
      .delete()
      .from(Category)
      .where("id = :category_id", { category_id: id })
      .execute()

    res.status(200).json({
      status: 200,
      message: "Successful",
      data: category,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as string, 500))
  }
}

const CATEGORY_PATCH = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { category_title } = req.result as any

    console.log(category_title)
    console.log(id)

    const users = await AppDataSource.getRepository(Category)
      .createQueryBuilder()
      .update(Category)
      .set({ category_title })
      .where("id = :id", { id: id })
      .execute()

    res.status(200).json({
      message: "Succcessful",
      status: 201,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

export { CATEGORY_GET, CATEGORY_DELETE, CATEGORY_PATCH, CATEGORY_POST }
