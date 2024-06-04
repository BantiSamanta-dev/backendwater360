// tenderRoutes.mjs

import express from 'express';
import { 
  createTender,
  getAllTenders,
  getTenderById,
  updateTender,
  deleteTender 
} from '../controllers/tendercontroller.js';
import verifyToken from '../middlewares/auth.js';

const router = express.Router();

router.post('/tenders', verifyToken, createTender);
router.get('/tenders', getAllTenders);
router.get('/tenders/:id', getTenderById);
router.put('/tenders/:id', verifyToken, updateTender);
router.delete('/tenders/:id', verifyToken, deleteTender);

export default router;
