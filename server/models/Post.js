import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String },
  text: { type: String },
  imgUrl: { type: String, default: "" },
});

export default mongoose.model("Post", PostSchema)