const SubCategory = require("../../models/SubCategory");

const addSubCategory = async (req, res) => {
    try {
        const { category, name } = req.body;
        if (!category || !name) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const newSubCategory = await SubCategory.create({ category, name });

        return res.status(201).json({
            success: true,
            subCategory: newSubCategory,
            message: "Sub Category added successfully.",
        });

    } catch (error) {
        console.error("Error adding Sub Category:", error); 
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

const updateSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, name } = req.body;

        if (!category || !name) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const updatedSubCategory = await SubCategory.findByIdAndUpdate(
            id,
            { category, name },
            { new: true }
        );

        if (!updatedSubCategory) {
            return res.status(404).json({
                success: false,
                message: "Sub Category not found.",
            });
        }

        return res.status(200).json({
            success: true,
            subCategory: updatedSubCategory,
            message: "Sub Category updated successfully.",
        });

    } catch (error) {
        console.error("Error updating Sub Category:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

const deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSubCategory = await SubCategory.findByIdAndDelete(id);

        if (!deletedSubCategory) {
            return res.status(404).json({
                success: false,
                message: "Sub Category not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Sub Category deleted successfully.",
        });

    } catch (error) {
        console.error("Error deleting Sub Category:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

const getSubCategory = async (req, res) => {
    try {
        const subCategoryList = await SubCategory.find()
            .populate("category", "name")
            .sort({ _id: -1 });

        return res.status(200).json({
            success: true,
            subCategoryList,
        });

    } catch (error) {
        console.error("Error fetching Sub Categories:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

module.exports = {
    addSubCategory,
    updateSubCategory,
    deleteSubCategory,
    getSubCategory
}