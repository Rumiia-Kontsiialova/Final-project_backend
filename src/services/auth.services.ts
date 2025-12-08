import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../db/models/User.js";

import { RegisterPayload, LoginPayload } from "../schemes/auth.schemes.js";

import HttpError from "../utils/HttpError.js";

import { UserDocument } from "../db/models/User.js";

const { JWT_SECRET } = process.env;
if(!JWT_SECRET) {
    throw new Error("JWT_SECRET not define in environment variables")
}

type UserFindResult = UserDocument | null;

export interface LoginResult {
    accessToken: string;
    refreshToken: string;
    user: {
        email: string;
        username: string;
    }
}

export const registerUser = async (payload: RegisterPayload): Promise<UserDocument> => {
    const user: UserFindResult = await User.findOne({email: payload.email});
    if(user) throw HttpError(409, "Email already exist");

    const hashPassword: string = await bcrypt.hash(payload.password, 10);
    return User.create({...payload, password: hashPassword});
}
export const loginUser = async (payload: LoginPayload): Promise<LoginResult> => {
    // const user: UserFindResult = await User.findOne({email: payload.email});
    const user: UserFindResult = await User.findOne({
        $or: [
            {email: payload.email},
            //@ts-expect-error
            {username: payload.username},
        ]
    });
    if(!user) throw HttpError(401, "User not found");
    const passwordCompare: boolean = await bcrypt.compare(payload.password, user.password);
    if(!passwordCompare) throw HttpError(401, "User or password invalid");
    
    const tokenPayload = {
        id: user._id
,    };

    const accessToken: string = jwt.sign(tokenPayload, JWT_SECRET, {expiresIn: "15m"});
    const refreshToken: string = jwt.sign(tokenPayload, JWT_SECRET, {expiresIn: "7d"});
    await User.findByIdAndUpdate(user._id, {accessToken, refreshToken});

    return {
        accessToken,
        refreshToken,
        user: {
            email: user.email,
            username: user.username,
        }
    }
};
