import { Router } from "express"
import validateMiddleware from "../../middleware/validate.middleware"
import { comments, comments_put } from "../../validate/validate"
import { COMMENTS_DELETE, COMMENTS_GET, COMMENTS_POST, COMMENTS_PUT } from "./comment"

const router = Router()

router.post("/comments/post", validateMiddleware(comments), COMMENTS_POST)
router.put("/comments/put/:user_id", validateMiddleware(comments_put), COMMENTS_PUT)
router.delete("/comments/delete/:id", COMMENTS_DELETE)
router.get("/comments/get/:id", COMMENTS_GET)

export default router
