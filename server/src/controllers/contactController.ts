import { Request, Response } from "express";
import Contact from "../models/Contact";
import mongoose from "mongoose";

export const createContact = async (req: Request, res: Response) => {
    try {
        const {firstName, lastName, email, subject, message} = req.body;

        if(!firstName?.trim() || !lastName?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
            return res.status(400).json({message : "All fields are required!"});
        };

        const contact = await Contact.create({
            firstName : firstName.trim(),
            lastName : lastName.trim(), 
            email : email.trim().toLowerCase(), 
            subject : subject.trim(), 
            message : message.trim()
        });

        res.status(201).json(contact);

    } catch (error) {
        res.status(500).json({message : "server error"});
    }
};

export const getContact = async (req: Request, res: Response) => {
    try {
        const contact = await Contact.find().sort({ createdAt : -1 });

        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({message : "server error"});
    }
};

export const updateContact = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message : "Invalid id"});
        };

        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            req.body,
            { new : true },
        );

        if(!updatedContact) {
            return res.status(404).json({message : "The require field is missing"});
        };

        res.status(200).json({message : "Contact data updated successfully", data : updatedContact});
    } catch (error) {
        res.status(500).json({message : "server error"});
    }
};

export const deleteContact = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message : "Invalid id"});
        };

        const deletedContact = await Contact.findByIdAndDelete(id);

        if(!deletedContact) {
            return res.status(404).json({message : "The required field is missing"});
        }

        res.status(200).json({message : "Contact data deleted successfully"});

    } catch (error) {
        res.status(500).json({message : "server error"});
    }
};