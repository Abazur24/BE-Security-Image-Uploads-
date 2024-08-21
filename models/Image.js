import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  uploadDate: { type: Number, required: true },
  user_ip: { type: String, required: true },
});

const Image = mongoose.model("Image", ImageSchema);

export default Image;