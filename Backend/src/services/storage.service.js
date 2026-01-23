import ImageKit from "@imagekit/nodejs";
import dotenv from "dotenv";
dotenv.config(); 


const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadfile(fileBuffer, fileName) {
    try {
        const result = await imagekit.files.upload({
            file: fileBuffer.toString("base64"),
            fileName: fileName
        });
        return result;
    } catch (error) {
        console.error("Upload error:", error);
        throw error;
    }
}

export default {
    uploadfile
};
