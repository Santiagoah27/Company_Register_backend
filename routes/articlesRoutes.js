import express from "express";
import { addArticle, editArticle, deleteArticle } from '../controllers/articleController.js';
import checkAuth from "../middleware/checkAuth.js";
import checkAdmin from "../middleware/requireAdmin.js"

const router = express.Router();

router.post('/', checkAuth, checkAdmin, addArticle)
router
      .route("/:id")
      .put(checkAuth, checkAdmin, editArticle)
      .delete(checkAuth, checkAdmin, deleteArticle)

export default router