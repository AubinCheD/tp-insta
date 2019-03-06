import express from 'express';
import * as service from './services';
import { typePI } from './middleware';
import { typePO } from './middleware';
var bodyParser = require('body-parser');
import { createJWToken } from "./auth.js"
import { verifyJWT_MW } from "./middleware"
import { allowCrossDomain } from "./middleware"

const route = express.Router();
route.use(bodyParser.json());
route.use(allowCrossDomain);

/*** LOGIN ***/
/** curl -X POST -H "Content-Type: application/json" --data '{"email": "mou@llouk.com", "password": "baudhuit"}' https://daily-addition.glitch.me/login **/
route.post("/login", (req, res) => {
    console.log(req.body);
    let { email, password } = req.body;
    service
        .getUserCredentials(email)
        .then(async (route) => {
            try{
                await service.comparePasswords(password, route.password);
                console.log("user " + email + " logged in with success");

                res.status(200).json({
                    success: true,
                    token: createJWToken({
                        sessionData: { name: email, age: 15 },
                        maxAge: 3600
                    })
                });
            }catch(reject){
                console.log("user " + email + " failed to log in");
                res.status(401).json({
                    message: "Login ou mot de passe incorrect."
                });
            }
        });
});

/*** USERS ***/

/** curl -X POST -H "Content-Type: application/json" --data '{"id": "2", "name": "moullouk", "email": "mou@llouk.com", "password": "baudhuit", "photo": "/baudhuit", "nbPubli": "0", "nbAbonnes": "0", "nbAbonnements": "0"}' -H "authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJ0b3RvIiwiYWdlIjoxNX0sImlhdCI6MTU0ODY5NjI0MywiZXhwIjoxNTQ4Njk5ODQzfQ.SEZUal8NY8wKzEmYiEKTMSINiIVId0v8ndTVHEL0uUo" https://daily-addition.glitch.me/user **/
route.post("/user", (req, res) => {
    service.createUser(req.body).then(
        user => {
            res.status(200).json(user);
        },
        err => {
            console.error(err);
            res.status(500).send("error");
            return;
        }
    );
});

route.get("/profileImage/:user", (req, res) => {
    res.download("profileImages/" + req.params.user + ".jpg");
});

/** curl -X GET -H "authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJtb3VAbGxvdWsuY29tIiwiYWdlIjoxNX0sImlhdCI6MTU0ODg3MDc3NiwiZXhwIjoxNTQ4ODc0Mzc2fQ.CfpVtQq3-TEwNK5pmvr-qmtiP9Gg7vIagDRAKdCu1-0" https://daily-addition.glitch.me/postImage/cpapossible_carte-kiwi.jpg **/
route.get("/postImages/:path", (req, res) => {
    console.log("GET /postImage");
    res.sendFile(req.params.path, { root: "postImages"});
});

route.use(verifyJWT_MW);

route.get("/users", (req, res) => {
    console.log("GET /USERS");
    service
        .getByPage(req.query.page || 1, req.query.per_page || 10)
        .then(route => res.status(200).json({ route }));
});

route.get("/user/:id", (req, res) => {
    console.log("GET /USER");
    service.getById(req.param.id)
        .then(route => res.status(200).json({ route }));
});

/** curl -X GET -H "authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJ0b3RvIiwiYWdlIjoxNX0sImlhdCI6MTU0ODY5NjI0MywiZXhwIjoxNTQ4Njk5ODQzfQ.SEZUal8NY8wKzEmYiEKTMSINiIVId0v8ndTVHEL0uUo" https://daily-addition.glitch.me/getUserId?email=baud@huit.com **/
route.get("/getUserId", (req, res) => {
    console.log("GET /GetUserId");
    service
        .getUserId(req.query.email)
        .then(route => res.status(200).json({ route }));
});

/** curl -X GET -H "authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJ0b3RvIiwiYWdlIjoxNX0sImlhdCI6MTU0ODY5NjI0MywiZXhwIjoxNTQ4Njk5ODQzfQ.SEZUal8NY8wKzEmYiEKTMSINiIVId0v8ndTVHEL0uUo" https://daily-addition.glitch.me/getUserCredentials?email=baud@huit.com **/
/*route.get("/getUserCredentials", (req, res) => {
  service
  .getUserCredentials(req.query.email)
  .then(route => res.status(200).json({ route }));
});*/


/*** POSTS ***/
route.get("/posts", (req, res) => {
    console.log("GET /POSTS");
    service
        .getAll()
        .then(route => res.status(200).json({ route }));
});

route.get("/friendsPosts", (req, res) => {
    console.log("GET /friendsPosts");
    service
        .getByFriends(req.query.idUser)
        .then(route => res.status(200).json({ route }));
});

route.post("/post", (req, res) => {
    service.createPost(req.body).then(
        post => res.status(200).json(post),
        err => {
            console.error(err);
            res.status(500).send("error");
            return;
        }
    );
});

/*** IMAGES ***/

/** curl -X POST -H "Content-Type: multipart/form-data" -F "photo=@carte-kiwi.jpg" -H "authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJtb3VAbGxvdWsuY29tIiwiYWdlIjoxNX0sImlhdCI6MTU0ODg3MDc3NiwiZXhwIjoxNTQ4ODc0Mzc2fQ.CfpVtQq3-TEwNK5pmvr-qmtiP9Gg7vIagDRAKdCu1-0"  https://daily-addition.glitch.me/profileImage/cpapossible  **/
route.post("/profileImage/:user", typePI, (req, res) => {
    console.log("[userProfileImage] - Creation : " + req.params.user + ".jpg created");
    res.status(200).json(req.file);
});

/** curl -X POST -H "Content-Type: multipart/form-data" -F "photo=@carte-kiwi.jpg" -H "authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJtb3VAbGxvdWsuY29tIiwiYWdlIjoxNX0sImlhdCI6MTU0ODg3MDc3NiwiZXhwIjoxNTQ4ODc0Mzc2fQ.CfpVtQq3-TEwNK5pmvr-qmtiP9Gg7vIagDRAKdCu1-0"  https://daily-addition.glitch.me/postImage/cpapossible **/
route.post("/postImage/:user", typePO, (req, res) => {
    console.log("[postImage] - Creation");
    res.status(200).json(req.file);
});

/*** FOLLOW ***/

route.post("/follow", (req, res) => {
    service.createFollow(req.body).then(
        follow => res.status(200).json(follow),
        err => {
            console.error(err);
            res.status(500).send("error");
            return;
        }
    );
});

/*** COMMENTS ***/
route.get("/comments", (req, res) => {
    console.log("GET /COMMENTS");
    service.getByPost(req.query.idPost)
        .then(route => res.status(200).json({ route }));
});

route.post("/comment", (req, res) => {
    service.createComment(req.body).then(
        follow => res.status(200).json(follow),
        err => {
            console.error(err);
            res.status(500).send("error");
            return;
        }
    );
});



export default route;