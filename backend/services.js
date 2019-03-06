import User from './User.js';
import Post from './Post.js';
import Follow from './Follow.js';
import Comment from './Comment.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

/*** USERS ***/
export async function getByPage(page, per_page) {
    var start = (parseInt(page) - 1) * parseInt(per_page);
    let result = await User.find({})
        .skip(start)
        .limit(parseInt(per_page));
    return result;
};

export async function getById(idUser){
    let result = await User.findOne({ "_id.$oid" : idUser});

    return result;
}

export async function getUserId(email){
    let result = await User.findOne({"email" : email});

    return result;
}


export async function getUserCredentials(email){
    let result = await User.findOne({"email" : email});

    return result;
}

export function comparePasswords(password, hashedPassword){
    let promise = new Promise((resolve, reject) => {
        let newHashedPassword;
        bcrypt.compare(password, hashedPassword, function(err, res) {
            if(res){
                resolve();
            }else{
                reject();
            }
        });
    });

    return promise;
}

export async function createUser(user) {
    if (user) {
        if (!user._id) {
            console.log("[user] - Creation");

            let password;
            bcrypt.hash(user.password, saltRounds, function(err, hash) {
                if(!err){
                    password = hash;

                    return User.create({ ...user, password });
                }else{
                    return;
                }
            });
        }
    }
};

/*** POSTS ***/
export async function getByUser(idUser, page, per_page) {
    var start = (parseInt(page) - 1) * parseInt(per_page);
    let result = await Post.find({"idUser": idUser})
        .skip(start)
        .limit(parseInt(per_page));
    return result;
};

export async function getByFriends(idUser){
    let followed = await Follow.find({"idUser": idUser}).select('idFollowed -_id');
    var i, j;
    var posts = []
    for(i=0;i<followed.length;++i){
        let currentPosts = await Post.find({"idUser": followed[i].idFollowed});

        for(j=0;j<currentPosts.length;++j){

            posts.push(currentPosts[j]);
        }
    }


    return posts;
}

export async function createPost(post) {
    if (post) {
        if (!post._id) {
            console.log("[post] - Creation");
            return Post.create({ ...post });
        }
    }
};

/*** IMAGES ***/
export async function getUserProfileImage(imageUrl){

}

/*** FOLLOW ***/
export async function createFollow(follow) {
    if (follow) {
        if (!follow._id) {
            console.log("[follow] - Creation");
            let followId = follow.idUser;
            let followed = await getUserId(follow.emailFollowed);
            let followedId = followed._id;

            let followObject = await Follow.create({"idUser": followId, "idFollowed": followedId});

            return followObject;
        }
    }
};

/*** COMMENTS ***/
export async function getByPost(idPost) {
    let result = await Comment.find({"idPost": idPost});

    var arrayReturn = [];
    var i;
    for(i=0;i<result.length;++i){
        let name = await User.findOne({"_id": result[i].idUser});
        var eltReturn = {};
        eltReturn.text=result[i].text;
        eltReturn.name = name.name;
        arrayReturn.push(eltReturn);
    }

    return arrayReturn;
};

export async function createComment(comment) {
    if (comment) {
        if (!comment._id) {
            console.log("[comment] - Creation");
            return Comment.create({ ...comment });
        }
    }
};