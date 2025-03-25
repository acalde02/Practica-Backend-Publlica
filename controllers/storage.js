const { storageModel, usersModel, companyModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')
const { matchedData } = require('express-validator')
const path = require("path")
const fs = require("fs")

const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = __dirname + "/../storage"


/**
 * Obtener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({})
        res.send(data)
    }catch(err) {
        handleHttpError(res, 'ERROR_LIST_ITEMS')
    }
}

/**
 * Obtener un detalle
 * @param {} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try{
        const {id} = matchedData(req)
        const data = await storageModel.findById(id)
        res.send(data)
    } catch(err){
        //console.log(err)
        handleHttpError(res, "ERROR_GET_ITEM")
    }
}

/**
 * Inserta un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        const { file } = req;
        const userId = req.user._id;

        if (!file) {
            return handleHttpError(res, "NO_FILE_UPLOADED", 400);
        }

        const fileUrl = PUBLIC_URL + "/storage/" + file.filename;

        // Buscar al usuario con su compañía relacionada
        const user = await usersModel.findById(userId).populate('company');
        if (!user || !user.company) {
            return handleHttpError(res, "USER_OR_COMPANY_NOT_FOUND", 404);
        }

        const company = await companyModel.findById(user.company._id).populate('logo');

        // Si ya tiene un logo, eliminar archivo físico y documento
        if (company.logo) {
            const previousFilePath = path.join(MEDIA_PATH, company.logo.filename);
            if (fs.existsSync(previousFilePath)) {
                fs.unlinkSync(previousFilePath);
            }
            await storageModel.deleteOne({ _id: company.logo._id });
        }

        // Crear nuevo documento en storage
        const storageDoc = await storageModel.create({
            filename: file.filename,
            url: fileUrl
        });

        // Actualizar compañía con nuevo logo
        company.logo = storageDoc._id;
        await company.save();

        res.json({
            message: "Logo actualizado correctamente",
            logoUrl: fileUrl,
            storageEntry: storageDoc
        });

    } catch (err) {
        console.error("Error al subir el logo:", err);
        handleHttpError(res, "ERROR_UPLOADING_LOGO");
    }
};



/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try{
        const {id} = matchedData(req)
        const dataFile = await storageModel.findById(id)
        await storageModel.deleteOne({_id:id})
        const filePath = MEDIA_PATH + "/" + dataFile.filename
        fs.unlinkSync(filePath)
        const data = {
            filePath,
            deleted: true
        }
        res.send(data)
    } catch(err){
        //console.log(err)
        handleHttpError(res, "ERROR_GET_ITEM")
    }
}


module.exports = { getItems, getItem, createItem, deleteItem };