import express from  'express'
import { getMessage, sendMessage } from '../controllers/message.controller.js'
import protect from '../middlewares/auth.middleware.js'
const router = express.Router({ mergeParams: true })

router.post('/messages', protect, sendMessage)
router.get('/messages', protect, getMessage)

export default router