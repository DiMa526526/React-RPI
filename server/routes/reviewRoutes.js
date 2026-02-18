import { Router } from 'express';
import { addReview, getReviewByOfferId} from '../controllers/reviewController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = new Router();

router.post('/:offerId', authenticateToken, addReview);
router.get('/:offerId', getReviewByOfferId);

export default router;