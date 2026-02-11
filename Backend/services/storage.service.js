const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

const uploadFile = async (buffer) => {
    try {
        const result = await imagekit.upload({
            file: buffer.toString("base64"),
            fileName: `post-${Date.now()}.jpg`
        });
        return result;
    } catch (error) {
        console.error("Image upload failed:", error.message);
        throw error;
    }
};

module.exports = uploadFile;