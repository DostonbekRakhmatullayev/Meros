import { Router } from "express"
import validateMiddleware from "../../middleware/validate.middleware"
import { chegirma } from "../../validate/validate"
import { CHEGIRMA_DELETE, CHEGIRMA_GET, CHEGIRMA_PUT } from "./chegirmalar"

const router = Router()

router.get("/chegirma/get", CHEGIRMA_GET)
router.post("/chegirma/put/:id", validateMiddleware(chegirma), CHEGIRMA_PUT)
router.delete("/chegirma/delete/:id", CHEGIRMA_DELETE)

export default router
