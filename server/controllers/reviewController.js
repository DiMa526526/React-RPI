import { Review } from '../models/review.js';
import { User } from '../models/user.js';
import { Offer } from '../models/offer.js';
import ApiError from '../error/ApiError.js';

export async function getReviewsByOfferId(req, res, next) {
    try {
        const { offerId } = req.params;
        
        const offer = await Offer.findByPk(offerId);
        if (!offer) {
            return next(ApiError.badRequest('Offer not found'));
        }

        const reviews = await Review.findAll({
            where: { offerId },
            include: [{
                model: User,
                as: 'author',
                attributes: ['id', 'username', 'avatar', 'userType']
            }],
            order: [['publishDate', 'DESC']]
        });

        res.status(200).json(reviews);
    } catch (error) {
        console.error('Failed to get reviews:', error);
        next(ApiError.internal('Failed to get reviews: ' + error.message));
    }
}

export async function createReview(req, res, next) {
    try {
        const { offerId } = req.params;
        const { text, rating, authorId } = req.body;

        if (!text || !rating || !authorId) {
            return next(ApiError.badRequest('Text, rating and authorId are required'));
        }

        const offer = await Offer.findByPk(offerId);
        if (!offer) {
            return next(ApiError.badRequest('Offer not found'));
        }

        const user = await User.findByPk(authorId);
        if (!user) {
            return next(ApiError.badRequest('User not found'));
        }

        const review = await Review.create({
            text,
            rating,
            publishDate: new Date(),
            authorId,
            offerId
        });

        const reviewsCount = await Review.count({ where: { offerId } });
        await offer.update({ commentsCount: reviewsCount });

        const createdReview = await Review.findByPk(review.id, {
            include: [{
                model: User,
                as: 'author',
                attributes: ['id', 'username', 'avatar', 'userType']
            }]
        });

        res.status(201).json(createdReview);
    } catch (error) {
        console.error('Failed to create review:', error);
        next(ApiError.internal('Failed to create review: ' + error.message));
    }
}

export async function getReviewById(req, res, next) {
    try {
        const { id } = req.params;

        const review = await Review.findByPk(id, {
            include: [{
                model: User,
                as: 'author',
                attributes: ['id', 'username', 'avatar', 'userType']
            }]
        });

        if (!review) {
            return next(ApiError.badRequest('Review not found'));
        }

        res.status(200).json(review);
    } catch (error) {
        console.error('Failed to get review:', error);
        next(ApiError.internal('Failed to get review: ' + error.message));
    }
}

export async function updateReview(req, res, next) {
    try {
        const { id } = req.params;
        const { text, rating } = req.body;

        const review = await Review.findByPk(id);
        if (!review) {
            return next(ApiError.badRequest('Review not found'));
        }

        await review.update({
            text: text || review.text,
            rating: rating || review.rating
        });

        const updatedReview = await Review.findByPk(id, {
            include: [{
                model: User,
                as: 'author',
                attributes: ['id', 'username', 'avatar', 'userType']
            }]
        });

        res.status(200).json(updatedReview);
    } catch (error) {
        console.error('Failed to update review:', error);
        next(ApiError.internal('Failed to update review: ' + error.message));
    }
}

export async function deleteReview(req, res, next) {
    try {
        const { id } = req.params;

        const review = await Review.findByPk(id);
        if (!review) {
            return next(ApiError.badRequest('Review not found'));
        }

        const offerId = review.offerId;
        await review.destroy();

        const reviewsCount = await Review.count({ where: { offerId } });
        await Offer.update(
            { commentsCount: reviewsCount },
            { where: { id: offerId } }
        );

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Failed to delete review:', error);
        next(ApiError.internal('Failed to delete review: ' + error.message));
    }
}