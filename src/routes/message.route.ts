import { Router } from "express";
import messageController from '../controllers/message.controller'
import AuthByToken from '../middlewares/auth.middlewars'

const router = Router()

router.get('/', AuthByToken, messageController.teste)
router.post('/:id', AuthByToken , messageController.send)

export default router;