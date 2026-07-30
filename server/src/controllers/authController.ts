import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken";
import { generateResetToken } from "../utils/resetToken";
import crypto from "crypto";
import sendResetEmail from "../utils/sendResetEmail";

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
export const createUser = async (req: Request, res: Response) => {
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
export const logout = async (req: Request, res : Response) => {
    res.status(200).json({
        message : "Logout successful"
    });
};

// FORGOT PASSWORD
export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const {email} = req.body;

        if(!email) {
            return res.status(400).json({
                message : "Email is required",
            });
        }

        const user = await User.findOne({
            email : email.toLowerCase().trim(),
        });

        if(!user) {
            return res.status(200).json({
                message : "If an account with that email exists, a password reset link has been sent.",
            });
        }

        const {
            resetToken,
            hashedResetToken,
            resetTokenExpires,
        } = generateResetToken();

        user.resetPasswordToken  = hashedResetToken;
        user.resetPasswordExpires = resetTokenExpires;

        await user.save({
            validateBeforeSave: false,
        });

        const resetUrl = `${process.env.ADMIN_URL}/reset-password?token=${resetToken}`;

        await sendResetEmail(
            user.email,
            resetUrl
        )

        return res.status(200).json({
            message : "If an account with that email exists, a password reset link has been sent.",
        });

    } catch(error) {
        console.error("FORGOT PASSWORD ERROR:", error);

        return res.status(500).json({
            message : "Server error",
        });
    }
};

// RESET PASSWORD
export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token, password } = req.body;

        if(!token || !password) {
            return res.status(400).json({
                message : "Token and password are required",
            });
        }

        if(password.length < 8) {
            return res.status(400).json({
                message : "Password must be at least 8 characters",
            });
        }

        const hashedResetToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken: hashedResetToken,
            resetPasswordExpires : {
                $gt : new Date(),
            },
        });

        if(!user) {
            return res.status(400).json({
                message : "Invalid or expired reset token",
            });
        }

        const hashedPassword = await bcrypt.hash(
            password, 
            12
        );

        user.password = hashedPassword;

        // INVALIDATE RESET TOKEN
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save({
            validateBeforeSave: false,
        });

        return res.status(200).json({
            message : "Password reset successfully",
        });

    } catch (error) {
        console.error("RESET PASSWORD ERROR:", error);

        return res.status(500).json({
            message : "Server error",
        })
    }
}


// JWT logout is usually handled on the frontend by deleting the token from localStorage or cookies.
// Later, if you implement refresh tokens, logout becomes more involved.