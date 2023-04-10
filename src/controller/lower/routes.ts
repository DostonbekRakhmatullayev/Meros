import { Router } from "express"
import validateMiddleware from "../../middleware/validate.middleware"
import { lower_joi, lower_patch } from "../../validate/validate"
import { LOWERS_GET, LOWER_DELETE, LOWER_GET, LOWER_PATCH, LOWER_POST } from "./lower"

const router = Router()

router.post("/lower/post", validateMiddleware(lower_joi), LOWER_POST)
router.get("/lower/get/:id", LOWER_GET)
router.get("/lower/gets", LOWERS_GET)
router.delete("/lower/delete/:id", LOWER_DELETE)
router.patch("/lower/patch/:id", validateMiddleware(lower_patch), LOWER_PATCH)

export default router
