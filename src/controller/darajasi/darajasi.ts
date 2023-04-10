import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../../config/config"
import { Darajasi } from "../../entities/darajasi.entitiy"
import { ErrorHandling } from "../../exceptions/error.handling"

const DARAJASI_PUT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as any

    const { star } = req.result

    const darajasi = (await AppDataSource.getRepository(Darajasi).findOne({
      where: { products: { id: id } },
    })) as any

    if (!darajasi) {
      console.log(star)

      const zakas = await AppDataSource.getRepository(Darajasi)
        .createQueryBuilder()
        .insert()

        .into(Darajasi)
        .values({ increment: 1, ortachas: star, star: star, products: id })
        .returning(["*"])
        .execute()

      res.status(200).json({
        message: "Successful",
        status: 201,
      })
    }

    const increment = darajasi?.increment + 1
    const stars = darajasi?.star + star
    const ortachas = (stars / increment).toFixed(2)
    const asd = darajasi.id

    const zakas = await AppDataSource.createQueryBuilder()
      .update(Darajasi)
      .set({
        increment: increment,
        ortachas: ortachas,
        star: stars,
        products: id,
      })
      .where("id = :id", { id: asd })
      .execute()

    res.status(200).json({
      message: "Successful",
      status: 201,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as string, 400))
  }
}

export { DARAJASI_PUT }
