import { Router } from "express"
import validateMiddleware from "../../middleware/validate.middleware"
import { darajasi_joi } from "../../validate/validate"
import { DARAJASI_PUT } from "./darajasi"

const router = Router()

router.put("/darajasi/put/:id", validateMiddleware(darajasi_joi), DARAJASI_PUT)

export default router
