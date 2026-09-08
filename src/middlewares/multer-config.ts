import multer from "multer";
import path from "path";
import fs from 'fs'

const artistStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = "uploads/artists/";
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname.split('.')[0];
        const uniqueSuffix = Date.now();
        cb(null, originalName + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const albumStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = "uploads/albums/";
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname.split('.')[0];
        const uniqueSuffix = Date.now();
        cb(null, originalName + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const songStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = "uploads/songs/";
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname.split('.')[0];
        const uniqueSuffix = Date.now();
        cb(null, originalName + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});


const artistUpload = multer({ storage: artistStorage });
const albumUpload = multer({ storage: albumStorage });
const songUpload = multer({ storage: songStorage });


export { artistUpload, albumUpload, songUpload }