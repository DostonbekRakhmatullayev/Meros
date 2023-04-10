import express, { Application } from "express"
import dotenv from "dotenv/config"
import { ErrorMiddleare } from "./middleware/error.middleware"
import model from "./controller"
import { AppDataSource } from "./config/config"
import swagger from "swagger-ui-express"
import docs from "./docs.json"
const app: Application = express()

app.use(express.json())

AppDataSource.initialize()
  .then((): void => console.log("Connectd"))
  .catch((error: unknown): void => console.log(error))

app.use(model)

app.use("/swagger", swagger.serve, swagger.setup(docs))
app.use(ErrorMiddleare)

app.use("/*", (req, res, next) => {
  res.status(500).json({
    message: req.url + "is not found",
  })
})

app.listen(9090, (): void => {
  console.log(9090)
})
