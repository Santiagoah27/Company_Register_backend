import express from 'express';
import { getCompanies, newCompany, getCompany, editCompany, deleteCompany} from '../controllers/companyController.js';
import checkAuth from "../middleware/checkAuth.js";
import checkAdmin from "../middleware/requireAdmin.js"

const router = express.Router();

router
   .route("/")
   .get(checkAuth, getCompanies)
   .post(checkAuth, checkAdmin, newCompany)

router
    .route('/:id')
    .get(checkAuth, getCompany)
    .put(checkAuth, checkAdmin, editCompany)
    .delete(checkAuth, checkAdmin, deleteCompany);

export default router;