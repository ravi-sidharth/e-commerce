const Address = require("../../models/Address");


const addAddress = async (req, res) => {
    try {
        const { userId, address, city, pincode, phone, notes } = req.body;

        if (!userId || !address || !city || !pincode || !phone || !notes) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data provided'
            })
        }

        const newlyCreatedAddress = new Address({ userId, address, city, pincode, phone, notes})
        await newlyCreatedAddress.save()

        res.status(201).json({
            success:true,
            data :newlyCreatedAddress
        })

    } catch (err) {
        logger.error(err.message)
        res.status(500).json({
            success: false,
            message: 'Some error occured', err
        })
    }
}


const fetchAllAddress = async (req, res) => {
    try {
        const {userId} = req.params
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data provided'
            })
        }

        const addresses = await Address.find({userId})
        
        res.status(200).json({
            success:true,
            data : addresses
        })
    } catch (err) {
        logger.error(err.message)
        res.status(500).json({
            success: false,
            message: 'Some error occured', err
        })
    }
}



const editAddress = async (req, res) => {
    try {
        const {userId, addressId} = req.params 
        const formData = req.body 
        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: 'user and address id is required!'
            })
        }

        const address = await Address.findOneAndUpdate({userId,_id:addressId},formData,{ new: true } )
        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found!'
            })
        }

        res.status(200).json({
            success:true ,
            data : address
        })


    } catch (err) {
        logger.error(err.message)
        res.status(500).json({
            success: false,
            message: 'Some error occured', err
        })
    }
}



const deleteAddress = async (req, res) => {
    try {
        const {userId, addressId} = req.params 
        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data provided'
            })
        }

        const address = await Address.findOneAndDelete({_id:addressId , userId})

        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found!'
            })
        }

        res.status(200).json({
            success:true,
            message:"Address is deleted successfully"
        })

    } catch (err) {
        logger.error(err.message)
        res.status(500).json({
            success: false,
            message: 'Some error occured', err
        })
    }
}

module.exports = {
    addAddress,
    fetchAllAddress,
    editAddress,
    deleteAddress
}