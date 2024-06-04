const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var articleSchema = new mongoose.Schema({

    articleTitle: String,

    description: {
        type: String,
    },
    slug: String,
    category: { type: String },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'registers'
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },
},
    { timestamps: true },
);
articleSchema.plugin(mongoosePaginate);
var articleModel = mongoose.model('article', articleSchema);
module.exports = articleModel;