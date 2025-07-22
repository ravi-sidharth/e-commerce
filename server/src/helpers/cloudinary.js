const cloudinary = require('cloudinary').v2
const multer = require('multer')

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

const storage = new multer.memoryStorage()
const upload = multer({storage})


async function uploadResult(file) {
    const result = await cloudinary.uploader.upload(file , {
        resource_type: 'auto'
    })
    return result
}

module.exports = {
    upload,
    uploadResult
}