import { Router } from "express";
import { createPost, getMyPosts,deletePost,updatePost,getById } from "../controllers/post.js";

import { checkAuth } from "../uttils/checkAuth.js";

const router = new Router();

router.post("/",checkAuth, createPost);

router.get("/",checkAuth,getMyPosts);
router.get("/:id",checkAuth,getById);
router.delete("/:id",checkAuth, deletePost);
router.put("/:id",checkAuth, updatePost);
export default router;
