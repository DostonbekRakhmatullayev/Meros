import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../../config/config"
import { Comments } from "../../entities/comments.entitiy"
import { Users } from "../../entities/users.entitiy"
import { ErrorHandling } from "../../exceptions/error.handling"
import jwt from "../../lib/jwt"

const COMMENTS_GET = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const comment = await AppDataSource.getRepository(Comments)
      .find({
        where: { products: { id: id } },
        relations: { users: true },
        select: {
          id: true,
          comment_title: true,
          users: {
            last_name: true,
            first_name: true,
            avatar: true,
          },
        },
      })
      .catch((error) => next(new ErrorHandling(error.message as string, 400)))

    res.status(200).json({
      status: 200,
      message: "Succsseful",
      data: comment,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as string, 500))
  }
}
const COMMENTS_POST = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req?.headers as any
    const user_id = jwt.verify(token) as any
    const user = await AppDataSource.getRepository(Users)
      .findOne({
        where: { id: user_id },
      })
      .catch((error) => next(new ErrorHandling(error.message, 400)))

    if (!user) {
      return next(new ErrorHandling("Users not found", 400))
    }

    const { comment_title, productsId } = req.result
    const users = user_id
    const products = productsId as any
    const comment = await AppDataSource.getRepository(Comments)
      .createQueryBuilder()
      .insert()
      .into(Comments)
      .values({ comment_title, products, users })
      .execute()
      .catch((error) => next(new ErrorHandling(error.message, 400)))

    res.status(200).json({
      status: 200,
      message: "Succsseful",
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as string, 400))
  }
}

const COMMENTS_PUT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req?.headers as any
    const user_id = jwt.verify(token) as any
    const { comment_title } = req.result
    const id = user_id
    const users = await AppDataSource.getRepository(Comments)
      .createQueryBuilder()
      .update()
      .set({ comment_title })
      .where("id = :id", { id: id })
      .execute()
      .catch((error) => next(new ErrorHandling(error.message, 400)))

    res.status(200).json({
      message: "Succcessful",
      status: 201,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as string, 400))
  }
}

const COMMENTS_DELETE = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const category = await AppDataSource.getRepository(Comments)
      .createQueryBuilder()
      .delete()
      .from(Comments)
      .where("id = :id", { id: id })
      .execute()
      .catch((error) => next(new ErrorHandling(error.message, 400)))

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

export { COMMENTS_POST, COMMENTS_GET, COMMENTS_DELETE, COMMENTS_PUT }
