import Company from "../models/Company.js"
import asyncHandler from "express-async-handler";
import Articles from "../models/Articles.js"

const createError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

const addArticle = asyncHandler( async (req, res) => {
    const { company } = req.body;
    const companyExists = await Company.findById(company);

    if(!companyExists) {
        return res.status(404).json({ msg: createError(404, "La compañia no existe").message });
    }

    const storeArticle = await Articles.create(req.body)
    companyExists.articles.push(storeArticle._id)
    await companyExists.save()
    res.json(storeArticle)
})

const editArticle = asyncHandler(async (req, res) => {
    const { id } = req.params

    const article = await Articles.findById(id);

    if(!article) {
        return res.status(404).json({ msg: createError(404, "La compañia no existe").message });
    }

    article.name = req.body.name || article.name
    article.quantity = req.body.quantity || article.quantity

    const storeArticle = await article.save();
    res.json(storeArticle)
})


const deleteArticle = asyncHandler(async (req, res) => {
    const { id } = req.params

    const article = await Articles.findById(id);

    if(!article) {
        return res.status(404).json({ msg: createError(404, "La compañia no existe").message });
    }

    await article.deleteOne();
    const error = new Error("articulo eliminado correctamente")
    res.json({ msg: error.message })
})

export{
    addArticle,
    editArticle,
    deleteArticle
}