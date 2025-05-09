const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const StorageScheme = new mongoose.Schema(
    {
        url: {
            type: String
        },
        filename: {
            type: String
        }
    },
    {
        timestamp: true, // TODO createdAt, updatedAt
        versionKey: false
    }
)
StorageScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("storage", StorageScheme) // Nombre de la colección (o de la tabla en SQL)