const Feature = require('../../models/Feature')
const logger = require('../../utils/logger')


const addFeatureImage = async(req,res) => {
    try{

        const {image} = req.body
        const featuresImages = new Feature(
            {image}
        )
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

module.exports = {
    addFeatureImage,
    getFeatureImages
}