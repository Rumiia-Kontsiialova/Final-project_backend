import bcrypt from "bcrypt";

import User from "../db/models/User.js";

import { RegisterPayload, LoginPayload } from "../schemes/auth.schemes.js";

import HttpError from "../utils/HttpError.js";

import { UserDocument } from "../db/models/User.js";

type UserFindResult = UserDocument | null;

export const registerUser = async (payload: RegisterPayload): Promise<UserDocument> => {
    const user: UserFindResult = await User.findOne({email: payload.email});
    if(user) throw HttpError(409, "Email already exist");

    const hashPassword: string = await bcrypt.hash(payload.password, 10);
    return User.create({...payload, password: hashPassword});
}
export const loginUser = async (payload: LoginPayload) => {
    const user: UserFindResult = await User.findOne({email: payload.email});
    const user: UserFindResult = await User.findOne({
        $or: [
            {email: payload.email},
            {username: payload.username},
        ]
    });
    if(!user) throw HttpError(401, "User not found");
    const passwordCompare: boolean = await bcrypt.compare(payload.password, user.password);
    if(!passwordCompare) throw HttpError(401, "User or password invalid");
    
};
