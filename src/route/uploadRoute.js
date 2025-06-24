import express from "express";
import multer from "multer";
import fs from "fs";
import cloudinary from "../utilitis/cloudinary.js"

const router=express.Router()


const storage = multer.diskStorage({});
const upload = multer({ storage });


router.post('/', upload.single("image"), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            overwrite: true,
            invalidate: true,
            resource_type: "auto"
        });

        fs.unlinkSync(req.file.path); // cleanup temp file

        res.status(200).json({ url: result.secure_url });
    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({ message: "Image upload failed", error: err });
    }
})

export default router