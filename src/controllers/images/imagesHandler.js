const multer = require("multer");
const fs = require('fs');
const { uploadImage } = require("./imagesController");
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const uploadImageHl = async (req, res) => {

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
     api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
  


    const storage = new CloudinaryStorage({

      cloudinary: cloudinary,
      
      params: {
        allowedFormats: ['jpg', 'png'],
        folder: 'emprendar_project',
        format: async (req, file) => 'png', // Formato de archivo deseado
        public_id: (req, file) => `${file.fieldname}_${Date.now()}`, // Nombre del archivo en Cloudinary
      }
    });

      const upload = multer({storage: storage, limits:{fileSize:1024 * 1024 *10 }}).single('image') 

        try {
            upload(req,res, async (error)=> {
                // console.log(req.file)
                if(error) {
                    console.log(error);
        
                } else {
                    const imageUrl = await uploadImage(req.file)
        
                    res.json({imageUrl})
                }
        }) 
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al subir la imagen a Cloudinary' });
        }

};

module.exports = {
  uploadImageHl,
};
