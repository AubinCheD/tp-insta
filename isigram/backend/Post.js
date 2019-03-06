import mongoose from "mongoose";
const Schema = mongoose.Schema;

var PostSchema = new Schema({
    idUser: String,
    photo: String,
    description: String,
    nbLikes: Number
});

PostSchema.index({ id: 1});
let Post = mongoose.model("Post", PostSchema);

export default Post;