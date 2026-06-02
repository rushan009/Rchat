import { getUserById, searchUser } from "../controllers/user.controller.js";
import express from 'express'
import protect from "../middlewares/auth.middleware.js";
const router = express.Router()

router.get('/search',protect ,searchUser)
router.get('/:id',protect, getUserById)

export default router
