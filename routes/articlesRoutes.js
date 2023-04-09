import express from "express";
import fileUpload from "express-fileupload";
import { addArticle, editArticle, deleteArticle, sendInventoryPDF } from '../controllers/articleController.js';
import checkAuth from "../middleware/checkAuth.js";
import checkAdmin from "../middleware/requireAdmin.js"

const router = express.Router();

router.use(fileUpload());

router.post('/', checkAuth, checkAdmin, addArticle)
router.post('/send-inventory-pdf', sendInventoryPDF)
router
      .route("/:id")
      .put(checkAuth, checkAdmin, editArticle)
      .delete(checkAuth, checkAdmin, deleteArticle)

export default router;
