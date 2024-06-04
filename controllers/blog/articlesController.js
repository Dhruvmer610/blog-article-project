var articleModel = require('../../model/articlesModel');
var categoryModel = require('../../model/categoryModel');

exports.addArticle = async (req, res) => {

    try {
        var { articleTitle, description, category, slug, categoryId } = req.body;
        var userId = req.user._id;
        var categoryExists = await categoryModel.findOne({ _id: categoryId });
        if (!categoryExists) {
            return res.status(400).send({
                status: false,
                message: "Category not available"
            });
        }

        var articledetails = new articleModel({
            articleTitle,
            description,
            slug,
            category,
            categoryId,
            userId
        });

        var data = await articledetails.save();
        var response = {
            status: true,
            message: "Article Created Successfully",
            data
        };
        return res.send(response);
    } catch (error) {
        var response = {
            status: false,
            message: error.message
        };
        return res.send(response);
    }
};

exports.editArticle = async (req, res) => {
    try {
        var { articleTitle, description, category, slug, categoryId } = req.body;
        var userId = req.user._id;
        var oldData = await articleModel.findOne({ _id: req.params._id }).lean();
        if (!oldData) {
            return res.status(404).send({
                status: false,
                message: "Article not found"
            });
        }

        if (oldData.userId.toString() !== userId.toString()) {
            return res.status(403).send({
                status: false,
                message: "You are not authorized to update this article"
            });
        }

        if (categoryId) {
            var categoryExists = await categoryModel.findOne({ _id: categoryId });
            if (!categoryExists) {
                return res.status(400).send({
                    status: false,
                    message: "Category not available"
                });
            }
        }
        var updatedArticle = {};
        if (articleTitle) updatedArticle.articleTitle = articleTitle;
        if (description) updatedArticle.description = description;
        if (slug) updatedArticle.slug = slug;
        if (category) updatedArticle.category = category;
        if (categoryId) updatedArticle.categoryId = categoryId;

        await articleModel.updateOne({ _id: req.params._id }, { $set: updatedArticle });
        return res.send({
            status: true,
            message: "Article updated successfully",
            data: updatedArticle
        });
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        });
    }
}

exports.deleteArticle = async (req, res) => {
    try {
        var userId = req.user._id;

        var oldData = await articleModel.findOne({ _id: req.params._id }).lean();
        if (!oldData) {
            return res.status(404).send({
                status: false,
                message: "Article not found"
            });
        }

        if (oldData.userId.toString() !== userId.toString()) {
            return res.status(403).send({
                status: false,
                message: "You are not authorized to delete this article"
            });
        }

        await articleModel.deleteOne({ _id: req.params._id });
        return res.send({
            status: true,
            message: "Article deleted successfully"
        });
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        });
    }
}
exports.viewArticle = async (req, res) => {
    try {
        const pipeline = [];
        pipeline.push({ $project: { "__v": 0 } })
        pipeline.push({
            $lookup:
            {
                from: "registers",
                localField: "userId",
                foreignField: "_id",
                as: "userId",
            }
        })
        pipeline.push({ $project: { "userId.__v": 0, "userId.password": 0 } })
        var articledata = await articleModel.aggregate(pipeline)
        var response = {
            status: true,
            message: "Article view successfully",
            articledata
        }
        return res.send(response)

    }
    catch (error) {
        var response = {
            status: false,
            message: error.message
        }
        return res.send(response)
    }
}
exports.searchAndSorting = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', sortField = 'createdAt', sortOrder = 'desc' } = req.query;

        const searchCriteria = search ? {
            $or: [
                { articleTitle: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        } : {};

        const sort = {};
        sort[sortField] = sortOrder === 'asc' ? 1 : -1;

        const pages = await articleModel.paginate(searchCriteria, {
            page,
            limit,
            sort
        });

        var response = {
            status: true,
            message: "Search and sorting",
            pages
        };
        return res.send(response);
    } catch (error) {
        var response = {
            status: false,
            message: error.message
        };
        return res.send(response);
    }
}