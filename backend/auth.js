import jwt from "jsonwebtoken";
import _ from "lodash";

export async function verifyJWTToken(token) {
    try {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            throw "empty token";
        }
        return decodedToken;
    } catch (err) {
        throw "token not valid";
    }
}

export function createJWToken(details) {
    if (typeof details !== "object") {
        details = {};
    }

    if (!details.maxAge || typeof details.maxAge !== "number") {
        details.maxAge = 3600;
    }

    details.sessionData = _.reduce(
        details.sessionData || {},
        (memo, val, key) => {
            if (typeof val !== "function" && key !== "password") {
                memo[key] = val;
            }
            return memo;
        },
        {}
    );


    let token = jwt.sign(
        {
            data: details.sessionData
        },
        process.env.JWT_SECRET,
        {
            expiresIn: details.maxAge,
            algorithm: "HS256"
        }
    );

    return token;
}