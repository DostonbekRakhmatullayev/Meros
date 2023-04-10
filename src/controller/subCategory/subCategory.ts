import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../../config/config"
import { Client } from "../../config/redis"
import { SubCategory } from "../../entities/subCategory.entitiy"
import { ErrorHandling } from "../../exceptions/error.handling"

const SUB_CATEGORY_GET = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const redis = await Client()
    const sub_category = await redis?.get("subCategory")

    if (!sub_category) {
      const subCategory: SubCategory[] = await AppDataSource.getRepository(SubCategory).find({
        relations: { lower: true },
      })

      await redis?.setEx("subCategory", 15, JSON.stringify(subCategory))

      return res.json({
        ststus: 200,
        message: "Successful",
        data: subCategory,
      })
    }

    return res.json({
      ststus: 200,
      message: "Successful",
      data: JSON.parse(sub_category),
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as string, 500))
  }
}

const SUB_CATEGORY_POST = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sub_category_title, categoryId } = req?.result
    const category: any = categoryId
    const subCategorys = await AppDataSource.getRepository(SubCategory)
      .createQueryBuilder()
      .insert()
      .into(SubCategory)
      .values({ sub_category_title, category })
      .execute()
      .catch((error) => next(new ErrorHandling(error.message, 400)))
    res.status(200).json({
      ststus: 200,
      message: "Successful",
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as string, 500))
  }
}

const SUB_CATEGORY_DELETE = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const category = await AppDataSource.getRepository(SubCategory)
      .createQueryBuilder()
      .delete()
      .from(SubCategory)
      .where("id = :subCategory_id", { subCategory_id: id })
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

const SUB_CATEGORY_PATCH = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { sub_category_title, category } = req.result as any
    const users = await AppDataSource.getRepository(SubCategory)
      .createQueryBuilder()
      .update(SubCategory)
      .set({ sub_category_title, category })
      .where("id = :id", { id: id })
      .execute()
      .catch((error) => next(new ErrorHandling(error.message, 400)))
    res.status(200).json({
      message: "Succcessful",
      status: 201,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

const SUB_CATEGORYS_GET = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as any

    const subCategory = await AppDataSource.getRepository(SubCategory)
      .find({
        where: { category: { id: id } },
        relations: { lower: true },
      })
      .catch((error) => next(new ErrorHandling("Bunaqa SubCategoriy yuq ( ˘︹˘ )", 400)))

    res.status(200).json({
      status: 200,
      message: "Successful",
      data: subCategory,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as string, 500))
  }
}

export { SUB_CATEGORY_POST, SUB_CATEGORY_PATCH, SUB_CATEGORY_DELETE, SUB_CATEGORYS_GET, SUB_CATEGORY_GET }
