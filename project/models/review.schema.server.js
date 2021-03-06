var mongoose = require('mongoose');
var ReviewSchema = mongoose.Schema({
        title: String,
        description: String,
        timestamp: {
            type: Date,
            default: Date.now
        },
        movieId: String,
        userId: String,
        rating: String
    }, {collection: 'project.reviews'});
module.exports = ReviewSchema;