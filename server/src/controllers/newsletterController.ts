import {Request, Response} from "express";
import Newsletter from "../models/Newsletter";


export const subscribeNewsletter = async (req: Request, res: Response) => {
    try {
        const {email} = req.body;


        if(!email) {
            return res.status(400).json({message : "Email is required"})
        }

        const existingEmail = await Newsletter.findOne({ email });

        if(existingEmail) {
            return res.status(400).json({message : "Email already subscribed"})
        }

        const subscriber = await Newsletter.create({
            email
        });

        res.status(201).json({
            message : "Subscribed successfully",
            subscriber,
        });
    } catch (error) {
        res.status(500).json({message : "Server error"})
    }
}