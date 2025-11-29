import { Request, Response } from "express";

const notFoundHandler = (req: Request, res: Response): void => {
    const {method, url} = req.body;
    res.status(404).json({
        message: `${method} ${url} not found`
    })
}

export default notFoundHandler