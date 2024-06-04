const categoryModel = require("../../model/categoryModel");

exports.addCategory = async (req, res) => {
    try {
        var { category } = req.body
        var categorydetails = new categoryModel({
            category
        })
        var data = await categorydetails.save();
        var response = {
            status: true,
            message: "Category added successfully",
            data
        }
        return res.send(response)
    }
    catch (error) {
        var response = {
            status: false,
            message: error.message
        }
        return res.send(response);
    }

}

exports.deleteCategory = async (req,res)=>{
    try {
        var categoryData = await categoryModel.findOneAndDelete({ _id: req.params._id }).lean();
        if (!categoryData) {
            var response = {
                status: false,
                message: "Category not found"
            }
            return res.send(response)
        }
        // console.log(categoryData, "oldData");
        return res.send({
            status: true,
            message: "Category deleted successfully"
        })
    } 
    catch (error) {
        var response = {
            status: false,
            message: error.message
        }
        return res.send(response);
    }
}