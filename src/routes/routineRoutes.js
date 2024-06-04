import express from 'express'
import verifyToken from '../middlewares/auth.js'
import { createRoutine, getAllRoutine } from '../controllers/routineController.js';



const router = express.Router()

router.get('/routines/:id', getAllRoutine)

router.post('/routines' ,verifyToken, createRoutine)

export default router
