const express = require("express")
const router = express.Router()
const { createItem } = require("../controllers/storage")
const authMiddleware = require("../middleware/session")
const uploadMiddleware = require("../utils/handleStorage")


    // PATCH http://localhost:3000/api/company/logo
    router.patch("/logo", authMiddleware, uploadMiddleware.single("image"), createItem)

    
module.exports = router