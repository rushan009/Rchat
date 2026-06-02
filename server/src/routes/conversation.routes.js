import express from  'express'
import { getConversation, createConversation } from '../controllers/conversation.controller.js'
import protect from '../middlewares/auth.middleware.js'
const router = express.Router()

router.post('/', protect, createConversation)
router.get('/', protect, getConversation)

export default router