var q = require('q');
var mongoose = require('mongoose');
var ReviewSchema = require('./review.schema.server.js');
var ReviewModel = mongoose.model('ReviewModel', ReviewSchema);

ReviewModel.findAllReviewsByMovieId = findAllReviewsByMovieId;
ReviewModel.addReview = addReview;
ReviewModel.updateReview = updateReview;
ReviewModel.deleteReview = deleteReview;
ReviewModel.findAllReviewsByUserId = findAllReviewsByUserId;
module.exports = ReviewModel;



    function findAllReviewsByMovieId(movieId) {
       return ReviewModel.find({movieId: movieId});
    }

    function addReview(userId, movieId, review) {

        review.userId = userId;
        review.movieId = movieId;
        return ReviewModel.create(review);
    }

    function updateReview(reviewId, review) {
        delete review._id;
        review.timestamp = new Date();
        return ReviewModel.update({_id: reviewId}, {$set: review});
    }

    function deleteReview(reviewId) {
        return ReviewModel.remove({_id: reviewId});
    }

    function findAllReviewsByUserId(userId) {

        return ReviewModel.find({userId: userId});
    }