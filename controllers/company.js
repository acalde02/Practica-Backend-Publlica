const { usersModel, companyModel: company } = require("../models");
const { handleHttpError } = require("../utils/handleError");

const registerCompanyCtrl = async (req, res) => {
    try {
        const userId = req.user._id;
        const companyData = req.body;

        const user = await usersModel.findById(userId).populate("company");
        if (!user) {
            return handleHttpError(res, "USER_NOT_FOUND", 404);
        }

        // Buscar si ya existe una compañía con el mismo CIF
        let existingCompany = await company.findOne({ cif: companyData.cif });

        if (existingCompany) {
            // Asignar al usuario si ya existe una compañía con ese CIF
            user.company = existingCompany._id;
            await user.save();

            return res.json({ message: "Company already exists. Linked user to existing company.", company: existingCompany });
        }

        let company;

        if (user.company) {
            // Actualizar compañía existente del usuario
            company = await company.findByIdAndUpdate(user.company._id, { $set: companyData }, { new: true, runValidators: true });
        } else {
            // Crear nueva compañía y asociarla
            company = await company.create(companyData);
            user.company = company._id;
            await user.save();
        }

        res.json({ message: "Company information updated", company });

    } catch (error) {
        console.error("Error updating company:", error);
        handleHttpError(res, "ERROR_UPDATING_COMPANY");
    }
};



module.exports = { registerCompanyCtrl };
