import express from 'express'
import usuarioController from '../controllers/usuario.controller'

const router = express.Router()

router.get('/', usuarioController.getUser)
router.post('/login', usuarioController.login)
router.post('/cadastro', usuarioController.register)

export default router