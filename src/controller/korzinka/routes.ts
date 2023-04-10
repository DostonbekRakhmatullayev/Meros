import { Router } from "express"
import validateMiddleware from "../../middleware/validate.middleware"
import { zakas } from "../../validate/validate"
import { ZAKAS_GET, ZAKAS_POST } from "./korzinka"

const router = Router()

router.post("/zakas/post", validateMiddleware(zakas), ZAKAS_POST)
router.get("/zakas/get", ZAKAS_GET)

export default router
