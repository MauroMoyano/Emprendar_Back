const cloudinary = require('cloudinary').v2


const uploadImage = async (file) => {

   
    try {
        // Sube la imagen a Cloudinary
        const result = await cloudinary.uploader.upload(file.path);
    
        // Devuelve la URL de la imagen en Cloudinary
        return result.secure_url;
      } catch (error) {
        console.log(error);
        throw error;
      }

}




module.exports = {
    uploadImage
}