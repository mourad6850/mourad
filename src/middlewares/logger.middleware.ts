import {Request, Response} from "express";

export const logger = (req: Request, res: Response, next) => {
    console.log('IP => '+req.ip)
    next()
}