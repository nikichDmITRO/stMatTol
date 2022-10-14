import { Router } from "express";
import { createPost, getAll,deletePost } from "../controllers/post.js";

import { checkAuth } from "../uttils/checkAuth.js";

const router = new Router();

router.post("/",checkAuth, createPost);

router.get("/",getAll);
router.delete("/:id",checkAuth, deletePost);

export default router;
