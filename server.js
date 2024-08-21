import express from 'express';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDB } from './libs/db.js';
import Image from './models/Image.js'; 

dotenv.config(); 

// to connect to MongoDB
await connectToDB();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

// multer set up for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the 'uploads' directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Ensure the filename is unique
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000 * 2000 } // file size limit
});

// the upload endpoint defined here
app.post('/uploadImage', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    // Get client IP address
    const user_ip = req.ip || req.connection.remoteAddress;

    // a new Image document created and saved to the database
    const image = new Image({
      filename: file.filename,
      path: file.path,
      uploadDate: Date.now(),
      user_ip: user_ip
    });

    await image.save();

    res.status(200).send('File uploaded and saved to the database successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('An error occurred while uploading the file.');
  }
});

// to start the server
app.listen(port, () => {
  console.log(`The server 🙈 is listening on port ${port}`);
});
