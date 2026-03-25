import {Router} from 'express';
import upload from '../middleware/upload.js'
import { getAllOffers, createOffer, getFullOffer, toggleFavorite } from '../controllers/offerController.js'; 
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = new Router();

router.get('/offers', getAllOffers);
router.post('/offers', upload.fields([
    { name: 'previewImage', maxCount: 1 },
    { name: 'photos', maxCount: 6 }
]), authenticateToken, createOffer);
router.get('/offers/:id', getFullOffer);
router.post('/offers/favorite/:offerId/:status', authenticateToken, toggleFavorite);


export default router;