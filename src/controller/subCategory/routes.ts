import { Router } from "express"
import chektoken from "../../middleware/chektoken"
import validateMiddleware from "../../middleware/validate.middleware"
import { subCategory, subCategory_patch } from "../../validate/validate"
import {
  SUB_CATEGORYS_GET,
  SUB_CATEGORY_DELETE,
  SUB_CATEGORY_GET,
  SUB_CATEGORY_PATCH,
  SUB_CATEGORY_POST,
} from "./subCategory"

const router = Router()

router.post("/subCategory/post", validateMiddleware(subCategory), SUB_CATEGORY_POST)
router.get("/subCategory/get", SUB_CATEGORY_GET)
router.get("/subCategory/get/:id", SUB_CATEGORYS_GET)
router.delete("/subCategory/delete/:id", SUB_CATEGORY_DELETE)
router.patch("/subCategory/patch/:id", validateMiddleware(subCategory_patch), SUB_CATEGORY_PATCH)
export default router
