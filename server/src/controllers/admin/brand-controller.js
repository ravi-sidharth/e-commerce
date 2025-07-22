const Brand = require("../../models/Brand.js");

const addBrand = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Brand name is required.",
            });
        }

        const existingBrand = await Brand.findOne({ name });
        if (existingBrand) {
            return res.status(400).json({
                success: false,
                message: `Brand "${name}" already exists.`,
            });
        }

        const newBrand = await Brand.create({ name });

        return res.status(201).json({
            success: true,
            brand: newBrand,
            message: "Brand added successfully!",
        });

    } catch (error) {
        console.error("Add Brand error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

const updateBrand = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Brand name is required.",
            });
        }

        const existingBrand = await Brand.findOne({ name });
        if (existingBrand && existingBrand._id.toString() !== id) {
            return res.status(400).json({
                success: false,
                message: `Brand "${name}" already exists.`,
            });
        }

        const updatedBrand = await Brand.findByIdAndUpdate(id, { name }, { new: true });
        if (!updatedBrand) {
            return res.status(404).json({
                success: false,
                message: "Brand not found.",
            });
        }

        return res.status(200).json({
            success: true,
            brand: updatedBrand,
            message: "Brand updated successfully!",
        });

    } catch (error) {
        console.error("Update Brand error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBrand = await Brand.findByIdAndDelete(id);
        if (!deletedBrand) {
            return res.status(404).json({
                success: false,
                message: "Brand not found.",
            });
        }

        return res.status(201).json({
            success:true,
            message:"Brand deleted Successfully!"
        }); 

    } catch (error) {
        console.error("Delete Brand error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

const getBrand = async (req, res) => {
    try {
        const brandList = await Brand.find().sort({ _id: -1 });
        return res.status(200).json({
            success: true,
            brandList,
        });

    } catch (error) {
        console.error("Fetch Brand error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

module.exports = {
    addBrand,
    updateBrand,
    deleteBrand,
    getBrand
}