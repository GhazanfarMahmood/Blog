import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken";

// LOGIN USER
export const login = async (req: Request, res : Response) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({
                message : "Email and password are required"
            });
        }

        const user = await User.findOne({
            email
        });

        if(!user) {
            return res.status(401).json({
                message : "Invalid credentials"
            })
        }

        if(!user.isActive) {
            return res.status(403).json({
                message : "Account is disabled"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch) {
            return res.status(401).json({
                message : "Invalid credentials"
            });
        }

        user.lastLogin = new Date();

        await user.save({ validateBeforeSave: false });

        const token = generateToken({
            id : user._id.toString(),
            role : user.role
        });

        res.status(200).json({
            message : "Login successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });


    } catch (error) {
        res.status(500).json({
            message : "Server error"
        });
    }
};


// CREATE USER (ADMIN CREATION)
export const createUser = async(req: Request, res: Response) => {
    try {
        const {name, email, password, role } = req.body;

        if(!name || !email || !password || !role) {
            return res.status(400).json({
                message : "All fields are required"
            });
        }

        const existingUser = await User.findOne({email});

        if(existingUser) {
            return res.status(400).json({ message : "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({ name, email, password: hashedPassword, role});

        return res.status(201).json({
            message : "User created successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            message : "Server error"
        })
    }
}

// LOGOUT
export const logout = async(req: Request, res : Response) => {
    res.status(200).json({
        message : "Logout successful"
    });
};

// JWT logout is usually handled on the frontend by deleting the token from localStorage or cookies.
// Later, if you implement refresh tokens, logout becomes more involved.