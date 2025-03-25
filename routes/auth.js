const express = require("express")
const { registerCtrl, loginCtrl, verifyCodeCtrl } = require("../controllers/auth")
const {validatorRegister, validatorLogin, validatorVerify} = require("../validators/auth")
const router = express.Router()

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - User
 *     summary: User Register
 *     description: Register a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: User registered
 *       401:
 *         description: User already exists
 *       500:
 *         description: Internal Server Error
 */


//POST http://localhost:3000/api/auth/register
router.post("/register", validatorRegister, registerCtrl)

//POST http://localhost:3000/api/auth/login
router.post("/login", validatorLogin, loginCtrl) 

//POST http://localhost:3000/api/auth/verify
router.post("/verify", validatorVerify, verifyCodeCtrl)


module.exports = router
