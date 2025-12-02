import { Request, Response } from "express";

import { registerUser, loginUser } from "../services/auth.services.js";

import validateBody from "../utils/validateBody.js";

import { registerSchema, loginSchema } from "../schemes/auth.schemes.js";

export const registerController = async (req: Request, res: Response): Promise<void> => {
    validateBody(registerSchema, req.body);
    await registerUser(req.body);

    res.status(201).json({
        message: "User register successfully"
    });
};

export const loginController = async (req: Request, res: Response) => {
    validateBody(loginSchema, req.body);
    const result = await loginUser(req.body);

    res.json(result);
}