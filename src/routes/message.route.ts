import { Router } from "express";
import messageController from '../controllers/message.controller'
import Auth from '../middlewares/auth.middlewars'

const router = Router()

router.post('/:id', Auth.AuthByParams, Auth.AuthByToken , messageController.send)
router.get('/:id', Auth.AuthByToken, Auth.AuthByParams, messageController.getMessages)

export default router;