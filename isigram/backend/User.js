import mongoose from "mongoose";
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    photo: String,
    nbPubli: Number,
    nbAbonnes: Number,
    nbAbonnements: Number
});

UserSchema.index({ name: 1});
let User = mongoose.model("User", UserSchema);

export default User;