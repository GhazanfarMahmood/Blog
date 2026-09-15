import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";
import { generateResetToken } from "../utils/resetToken";
import crypto from "crypto";
import sendResetEmail from "../utils/sendResetEmail";
import { AuthRequest } from "../middlewares/verifyToken";
import cloudinary from "../config/cloudinary";

// LOGIN USER
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken({
      id: user._id.toString(),
      role: user.role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        aboutMe: user.aboutMe,
        profileImage: user.profileImage,
        phoneNumber : user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// CREATE USER
export const createUser = async (req: AuthRequest, res: Response) => {
  try {
    if(!req.user) {
      return res.status(401).json({
        message : "Unauthorized",
      });
    }

    if(req.user.role !== "super-admin") {
      return res.status(403).json({
        message : "Forbidden. Only Super Admin can create users.",
      });
    }
    const {
      name,
      email,
      password,
      role,
      phoneNumber,
      aboutMe
    } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "Name, email, password and role are required",
      });
    }
    
    const allowedRoles = ["admin", "editor", "viewer"];

    if(!allowedRoles.includes(role)) {
      return res.status(400).json({
        message : "Invalid role",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role,
      aboutMe: aboutMe?.trim() || "",
      phoneNumber : phoneNumber?.trim() || "",
      profileImage : req.file?.path ?? null,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        aboutMe: user.aboutMe,
        profileImage: user.profileImage,
        role: user.role,
        phoneNumber: user.phoneNumber
      },
    });
  } catch (error) {
    console.error("CREATE USER ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// GETTING ALL USERS
export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message : "Unauthorized",
      });
    }

    const users = await User.find()
    .select(
      "-password -resetPasswordToken -resetPasswordExpires"
    )
    .sort({ createdAt : -1});

    return res.status(200).json({
      users: users.map((user) => ({
        id : user._id.toString(),
        name : user.name,
        email : user.email,
        phoneNumber : user.phoneNumber,
        aboutMe : user.aboutMe,
        profileImage : user.profileImage,
        role : user.role,
        createdAt : user.createdAt, 
        updatedAt : user.updatedAt
      })),
    });
  } catch (error) {
    console.error("GET USERS ERROR:", error);

    return res.status(500).json({
      message : "Server error",
    });
  }
};

// GETTING USERS BY ID 
export const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    if(!req.user) {
      return res.status(401).json({
        message : "Unauthorized",
      });
    }

    const user = await User.findById(req.params.id).select(
      "-password -resetPasswordToken -resetPasswordExpires"
    );

    if(!user) {
      return res.status(404).json({
        message : "User not found",
      })
    }

    return res.status(200).json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      aboutMe: user.aboutMe,
      profileImage: user.profileImage,
      role: user.role,
    });

  } catch (error) {
    console.error("GET USER ERROR:", error);

    return res.status(500).json({
      message : "Server error",
    });
  }
};

// LOGOUT
export const logout = async (
  req: Request,
  res: Response
) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(200).json({
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
    }

    const {
      resetToken,
      hashedResetToken,
      resetTokenExpires,
    } = generateResetToken();

    user.resetPasswordToken = hashedResetToken;
    user.resetPasswordExpires = resetTokenExpires;

    await user.save({
      validateBeforeSave: false,
    });

    const resetUrl =
      `${process.env.ADMIN_URL}/reset-password?token=${resetToken}`;

    await sendResetEmail(
      user.email,
      resetUrl
    );

    return res.status(200).json({
      message:
        "If an account with that email exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// RESET PASSWORD
export const resetPassword = async (
  req: Request,
  res: Response
) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        message: "Token and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    const hashedResetToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedResetToken,
      resetPasswordExpires: {
        $gt: new Date(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }

    user.password = await bcrypt.hash(password, 12);

    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save({
      validateBeforeSave: false,
    });

    return res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// GET CURRENT USER
export const getMe = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await User.findById(req.user.id).select(
      "-password -resetPasswordToken -resetPasswordExpires"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      aboutMe: user.aboutMe,
      profileImage: user.profileImage,
      role: user.role,
      phoneNumber: user.phoneNumber
    });
  } catch (error) {
    console.error("GET ME ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// UPDATE PROFILE
export const updateProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    // 1. Make sure authentication middleware added req.user
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // 2. Find current user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { name, aboutMe, phoneNumber, email } = req.body;

    if (name !== undefined) {
      const trimmedName = name.trim();

      if (!trimmedName) {
        return res.status(400).json({
          message: "Name cannot be empty",
        });
      }

      user.name = trimmedName;
    }

    if (aboutMe !== undefined) {
      user.aboutMe = aboutMe.trim();
    }

    if (phoneNumber !== undefined) {
      const trimmedPhoneNumber = phoneNumber.trim();
      
      if(
        trimmedPhoneNumber && 
        !/^[0-9+\-\s()]+$/.test(trimmedPhoneNumber)
      ) {
        return res.status(400).json({
          message : "Invalid phone number",
        });
      }

      user.phoneNumber = trimmedPhoneNumber;
    }

    if(email !== undefined) {
      if(req.user.role !== "super-admin") {
        return res.status(403).json({
          message : "Only Super Admin can change email address",
        });
      }

      const normalizeEmail = email.toLowerCAse().trim();

      if(!normalizeEmail) {
        return res.status(400).json({
          message : "Email cannot be empty",
        });
      }

      const existingUser = await User.findOne({
        email : normalizeEmail,
        _id : { $ne: user._id},
      });

      if(existingUser) {
        return res.status(400).json({
          message : "Email address is already in use",
        });
      }

      user.email = normalizeEmail;
    }

    if (req.file) {
      user.profileImage = req.file.path;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        aboutMe: user.aboutMe,
        profileImage: user.profileImage,
        role: user.role,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// DELETE PROFILE IMAGE
export const deleteProfileImage = async (req: AuthRequest, res: Response) => {
  try {
    if(!req.user) {
      return res.status(401).json({
        message : "Unauthorized",
      });
    }

    const user = await User.findById(req.user.id);

    if(!user) {
      return res.status(404).json({
        message : "User not found",
      });
    }

    if(!user.profileImage) {
      return res.status(400).json({
        message : "No profile image found",
      });
    }

    const imageUrl = user.profileImage;

    const uploadPath = imageUrl.split("/image/upload/")[1];

    if(uploadPath) {
      const pathWithoutVersion = uploadPath.replace(/^v\d+\//, "");

      const publicId = pathWithoutVersion.replace(/\.[^/.]+$/, "");

      await cloudinary.uploader.destroy(publicId);
    }

    user.profileImage = null;

    await user.save();

    return res.status(200).json({
      message : "Profile image deleted successfully",
      user: {
        id: user._id.toString(),
        name : user.name,
        email : user.email,
        aboutMe : user.aboutMe,
        profileImage : user.profileImage,
        role : user.role,
      },
    });
  } catch (error) {
    console.error("DELETE PROFILE IMAGE ERROR:", error);

    return res.status(500).json({
      message : "Server error",
    });
  }
};

// UPDATE USER BY SUPER ADMIN
export const updateUser = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Super Admin cannot manage another Super Admin
    if (user.role === "super-admin") {
      return res.status(403).json({
        message: "Super Admin cannot be managed from this endpoint.",
      });
    }

    const {
      name,
      email,
      phoneNumber,
      aboutMe,
      role,
    } = req.body;

    if (name !== undefined) {
      const trimmedName = name.trim();

      if (!trimmedName) {
        return res.status(400).json({
          message: "Name cannot be empty",
        });
      }

      user.name = trimmedName;
    }

    if (email !== undefined) {
      const normalizedEmail = email.toLowerCase().trim();

      if (!normalizedEmail) {
        return res.status(400).json({
          message: "Email cannot be empty",
        });
      }

      const existingUser = await User.findOne({
        email: normalizedEmail,
        _id: { $ne: user._id },
      });

      if (existingUser) {
        return res.status(400).json({
          message: "Email address is already in use",
        });
      }

      user.email = normalizedEmail;
    }

    if (phoneNumber !== undefined) {
      user.phoneNumber = phoneNumber.trim();
    }

    if (aboutMe !== undefined) {
      user.aboutMe = aboutMe.trim();
    }

    if (role !== undefined) {
      const allowedRoles = [
        "admin",
        "editor",
        "viewer",
      ];

      if (!allowedRoles.includes(role)) {
        return res.status(400).json({
          message: "Invalid role",
        });
      }

      user.role = role;
    }

    await user.save();

    return res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        aboutMe: user.aboutMe,
        profileImage: user.profileImage,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// DELETE UESR BY SUPER-ADMIN
export const deleteUser = async(
  req : AuthRequest, 
  res : Response
) => {  
  try {
    const { id } = req.params;

    if(req.user?.id === id) {
      return res.status(400).json({
        message : "You cannot delete your own account",
      });
    }

    const user = await User.findById(id);

    if(!user) {
      return res.status(404).json({
        message : "User not found.",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      message : "User deleted successfully.",
    })
  } catch (error) {
    console.error("Delete user error:", error);
    
    return res.status(500).json({
      message : "Failed to delete user.",
    });
  }
};

// SETTING USER PASSWORD BY SUPER ADMIN
export const setUserPassword = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if(!password) {
      return res.status(400).json({
        message : "Password is required",
      });
    }

    const user = await User.findById(id);

    if(!user) {
      return res.status(404).json({
        message : "User not found",
      });
    }

    if(user.role === 'super-admin'){
      return res.status(403).json({
        message : "Super Admin password cannot be change here",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      message : "Password updated successfully",
    });
  } catch (error) {
    console.error("SET USER PASSWORD ERROR:", error);

    return res.status(500).json({
      message : "Server error",
    });
  }
};

// SETTING USER PASSWORD BY OWN
export const changeOwnPassword = async(
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if(!currentPassword || !newPassword) {
      return res.status(400).json({
        message : "Current password and new password are required."
      });
    }

    if(newPassword.length < 8) {
      return res.status(400).json({
        message : "New password must be at least 8 characters.",
      });
    }

    const user = await User.findById(req.user?.id);

    if(!user) {
      return res.status(404).json({
        message : "User not found.",
      });
    }

    const isCurrentPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if(!isCurrentPasswordCorrect) {
      return res.status(400).json({
        message : "Current password is incorrect.",
      });
    }    

    if(currentPassword === newPassword) {
      return res.status(400).json({
        message : "New password must be different from the current password.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      message : "Password updated successfully.",
    });
  } catch (error) {
    console.error("CHANGE OWN PASSWORD ERROR:", error);

    return res.status(500).json({
      message : "Failed to updated password.",
    });
  }
};