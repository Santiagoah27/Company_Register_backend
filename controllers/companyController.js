import Company from "../models/Company.js"
import asyncHandler from "express-async-handler";

const getCompanies = asyncHandler( async (req, res) => {
    const companies = await Company.find().select('-articles');
    res.json(
        companies
    );
})

const newCompany = asyncHandler( async (req, res) => {
    const company = new Company(req.body)
    const { NIT } = req.body;
    const companyExists = await Company.findOne({ NIT: NIT});

    if(companyExists) {
        const error = new Error('Empresa ya registrada')
        return res.status(400).json({msg: error.message})
    }

    const companyStore = await company.save();
    res.json(companyStore);
})

// Validate company
const getCompanyById = asyncHandler(async (id) => {
    const company = await Company.findById(id).populate('articles');
  
    if (!company) {
      throw new Error('Empresa no encontrada');
    }
  
    return company;
  });

// Get company by Id
const getCompany = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const company = await getCompanyById(id);
    res.json(company);

})

// Edit company by Id
const editCompany = asyncHandler( async (req, res) => {
    const { id } = req.params;
    const { NIT } = req.body;

    const companyExists = await Company.findOne({ NIT: NIT});
    const company = await getCompanyById(id);

    if(company.NIT !== NIT){
        if(companyExists) {
            const error = new Error('Empresa ya registrada')
            return res.status(400).json({msg: error.message})
        }
    }

    company.name = req.body.name || company.name;
    company.address = req.body.address || company.address;
    company.NIT = req.body.NIT || company.NIT;
    company.phone = req.body.phone || company.phone;

    const companyStore = await company.save()
    res.json(companyStore)

})

//Delete company by Id
const deleteCompany = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const company = await getCompanyById(id);

    await company.deleteOne();
    const error = new Error("Empresa eliminada correctamente")
    res.json({ msg: error.message })
})

export {
    getCompanies,
    newCompany,
    getCompany,
    editCompany,
    deleteCompany
}