import { Router } from "express";
import { createPost, getAll } from "../controllers/post.js";

import { checkAuth } from "../uttils/checkAuth.js";

const router = new Router();

router.post("/",checkAuth, createPost);

router.get("/",getAll);

export default router;
