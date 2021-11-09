import express from 'express'
import usuarioController from '../controllers/usuario.controller'
import Auth from '../middlewares/auth.middlewars'

const router = express.Router()

router.get('/:id', Auth.AuthByParams, Auth.AuthByToken, usuarioController.getById)
router.get('/', Auth.AuthByToken, usuarioController.list)
router.post('/login', usuarioController.login)
router.post('/cadastro', usuarioController.register)

export default router