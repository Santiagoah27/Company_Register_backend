import Company from "../models/Company.js"
import asyncHandler from "express-async-handler";
import Articles from "../models/Articles.js"
import { sendInventoryByPdf } from "../helpers/email.js";

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

const sendInventoryPDF = asyncHandler(async (req, res) => {
  const pdfFile = req.body.pdf;
  const email = req.body.email;

  if (!pdfFile) {
    return res.status(400).json({ message: "No se recibió el archivo PDF" });
  }

  if (!email) {
    return res.status(400).json({ message: "No se recibió el correo electrónico" });
  }

  const pdfBuffer = Buffer.from(pdfFile, "base64");

  try {
    await sendInventoryByPdf({ email, pdfBuffer });
    res.status(200).json({ message: "PDF enviado con éxito" });
  } catch (error) {
    console.error("Error al enviar el email:", error);
    res.status(500).json({ message: "Error al enviar el PDF por correo" });
  }
});
  
  

export{
    addArticle,
    editArticle,
    deleteArticle,
    sendInventoryPDF
}