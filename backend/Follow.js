import mongoose from "mongoose";
const Schema = mongoose.Schema;

var FollowSchema = new Schema({
    idUser: String,
    idFollowed: String,
});

FollowSchema.index({ id: 1});
let Follow = mongoose.model("Follow", FollowSchema);

export default Follow;