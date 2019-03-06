import express from "express";
import multer from "multer";
import { verifyJWTToken } from "./auth.js";

/*** CORS ***/
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.status(200).json({ message: "ok" });
    }
    else {
        //move on
        next();
    }
};

/*** STORAGE PROFILE IMAGES ***/
const storagePI = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./profileImages/");
    },
    filename: function(req, file, cb) {
        cb(null, req.params.user + ".jpg");
    }
});
const uploadPI = multer({ storage: storagePI });
const typePI = uploadPI.single("photo");

/*** STORAGE POST IMAGES ***/
const storagePO = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./postImages/");
    },
    filename: function(req, file, cb) {
        cb(null, req.params.user + "_" + file.originalname);
    }
});
const uploadPO = multer({ storage: storagePO });
const typePO = uploadPO.single("photo");

/*** ROUTES ***/
const routes = express.Router();

/*** VERIFY TOKEN FUNCTION ***/
export function verifyJWT_MW(req, res, next) {
    let token = req.headers.authorization;
    verifyJWTToken(token)
        .then(decodedToken => {
            req.user = decodedToken.data;
            next();
        })
        .catch(err => {
            res.status(400).json({ message: "Invalid auth token provided." });
        });

}


module.exports = {
    typePI: typePI,
    typePO: typePO,
    verifyJWT_MW: verifyJWT_MW,
    allowCrossDomain: allowCrossDomain
}