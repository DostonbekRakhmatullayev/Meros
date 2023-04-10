import { Router } from "express"
import chektoken from "../../middleware/chektoken"
import validateMiddleware from "../../middleware/validate.middleware"
import { category, category_patch } from "../../validate/validate"
import { CATEGORY_DELETE, CATEGORY_GET, CATEGORY_PATCH, CATEGORY_POST } from "./category"

const router = Router()

router.post("/category/post", validateMiddleware(category), CATEGORY_POST)
router.get("/category/get", CATEGORY_GET)
router.delete("/category/delete/:id", CATEGORY_DELETE)
router.patch("/category/patch/:id", validateMiddleware(category_patch), CATEGORY_PATCH)

export default router
