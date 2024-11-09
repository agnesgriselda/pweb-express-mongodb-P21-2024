import { Router } from 'express';
import * as mechanismController from '../controllers/mechanism.controller';
import authMiddleware from '../middleware/auth';

const router = Router();

router.post('/borrow/:id', authMiddleware, mechanismController.borrowBook);
router.post('/return/:id', authMiddleware, mechanismController.returnBook);

export default router;