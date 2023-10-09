import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync("public")) {
            fs.mkdirSync("public");
        }
        if (!fs.existsSync("public/uploads")) {
            fs.mkdirSync("public/uploads");
        }
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({
    storage: storage,
});

export default upload;
