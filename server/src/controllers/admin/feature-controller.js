const Feature = require('../../models/Feature')
const logger = require('../../utils/logger')


const addFeatureImage = async(req,res) => {
    try{

        const {image} = req.body
        const featuresImages = new Feature({image} )
        await featuresImages.save()

        res.status(201).json({
            success:true,
            data:featuresImages
        })
     } catch(err) {
        logger.error(err)
        res.status(500).json({
            success:false ,
            message:'Some error occured!'
        })
    }
}


const getFeatureImages = async(req,res) => {
    try{
        const images = await Feature.find({}) 

        res.status(200).json({
            success:true ,
            data :images
        })
    } catch(err) {
        logger.error(err)
        res.status(500).json({
            success:false ,
            message:'Some error occured!'
        })
    }
}

const deleteFeatureImage = async(req,res) => {
    try{
        const {id} = req.params;
        await Feature.findByIdAndDelete(id)

        res.status(200).json({
            success:true,
            message:'Feature image deleted successfully!'
        })
    } catch(err) {
        logger.error('Error occured while deleting the feature image',err)
        res.status(500).json({
            success:false,
            message:'Error occured!',err
        })
    }
}
module.exports = {
    addFeatureImage,
    getFeatureImages,
    deleteFeatureImage
}