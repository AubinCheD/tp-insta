import mongoose from "mongoose";
const Schema = mongoose.Schema;

var CommentSchema = new Schema({
    idPost: String,
    idUser: String,
    text: String,
});

CommentSchema.index({ id: 1});
let Comment = mongoose.model("Comment", CommentSchema);

export default Comment;