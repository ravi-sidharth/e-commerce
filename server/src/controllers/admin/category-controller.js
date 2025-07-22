const Category = require('../../models/Category');
const { uploadResult } = require('../../helpers/cloudinary');

const addCategory = async (req, res) => {
    try {
        const { name } = req.body

        const result = await uploadResult(`data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`);
        const logo = result.url 
    
        if (!name || !logo) {
            return res.status(400).json({
                success: false,
                message: "Name and logo are required."
            });
        }
        const categoryCheck = await Category.findOne({ name });
        if (categoryCheck) {
            return res.status(409).json({
                success: false,
                message: `Category '${name}' already exists.`
            });
        }

        const newCategory = new Category({ name, logo });
        await newCategory.save();

        return res.status(201).json({
            success: true,
            message: "Category add successfully.",
            category: newCategory
        });

    } catch (error) {
        console.error("Error adding Category:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};




const updateCategory = async (req, res) => {
    try {
        const { name } = req.body
        const logo = req.file.destination + req.file.filename
        const id = req.params.id;
        if (!name || !logo) {
            return res.status(400).json({
                success: false,
                message: "Name and logo are required."
            });
        }
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found."
            })
        }
        category.name = name
        category.logo = logo
        await category.save();
        return res.status(201).json({
            success: true,
            message: "Category updated."
        })
    } catch (error) {
        console.error("Error upadte category:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}


const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found."
            })
        }
        
        await Category.findByIdAndDelete(id);
        return res.status(201).json({
            success: true,
            message: "Category deleted."
        })
        
    } catch (error) {
        console.error("Error delete Category:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

const getCategory = async (req, res) => {
    try {
        const categoryList = await Category.find({});
        res.status(200).json({
            success: true,
            categoryList
        });
    } catch (error) {
        console.error("Error fetch Category:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

module.exports = {
    addCategory,
    updateCategory,
    deleteCategory,
    getCategory
}   