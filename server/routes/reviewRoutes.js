import { Router } from 'express';
import { 
    getReviewsByOfferId, 
    createReview,
    getReviewById,
    updateReview,
    deleteReview 
} from '../controllers/reviewController.js';

const router = new Router();

router.get('/offers/:offerId/reviews', getReviewsByOfferId);

router.post('/offers/:offerId/reviews', createReview);

router.get('/reviews/:id', getReviewById);

router.put('/reviews/:id', updateReview);

router.delete('/reviews/:id', deleteReview);

export default router;