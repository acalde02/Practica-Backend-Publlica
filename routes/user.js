const express = require("express")
const router = express.Router()
const {userController, updateUserCtrl,deleteUserCtrl, registerGuestCtrl, restoreUserByAdminCtrl, 
    requestPasswordResetCtrl,  resetPasswordCtrl} = require("../controllers/user")
const {verifyAdminCtrl} = require("../controllers/auth")
const checkRol = require("../middleware/rol")
const  authMiddleware = require("../middleware/session")
const {validatorUser} = require("../validators/user")
const {validatorCompany} = require("../validators/company")
const {registerCompanyCtrl} = require("../controllers/company")
const uploadMiddleware = require("../utils/handleStorage")
const {createItem} = require("../controllers/storage")
const { validatorVerify } = require("../validators/auth")

//GET http://localhost:3000/api/user
router.get("/", authMiddleware, userController)

// DELETE http://localhost:3000/api/user
router.delete("/", authMiddleware, deleteUserCtrl)

// DELETE http://localhost:3000/api/user/:id?soft=false
router.delete("/:id", authMiddleware, checkRol(["admin"]), verifyAdminCtrl);

// PUT http://localhost:3000/api/user/register
router.put("/register", authMiddleware, validatorUser, updateUserCtrl)

// PATCH http://localhost:3000/api/user/company
router.patch("/company", authMiddleware, validatorCompany, registerCompanyCtrl)


// POST http://localhost:3000/api/user/guest
router.post("/guest", authMiddleware, validatorUser, registerGuestCtrl)

// PATCH http://localhost:3000/api/user/restore
router.patch("/restore/:id", authMiddleware, checkRol(["admin"]), restoreUserByAdminCtrl);

// POST http://localhost:3000/api/user/request-reset
router.post("/request-reset", requestPasswordResetCtrl);

// POST http://localhost:3000/api/user/reset-password
router.post("/reset-password", validatorVerify, resetPasswordCtrl);


module.exports = router