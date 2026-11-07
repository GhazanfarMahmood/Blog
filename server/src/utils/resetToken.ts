import crypto from "crypto";

export const generateResetToken = () => {
    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    const resetTokenExpires = new Date(
        Date.now() + 15 * 60 * 100
    );

    return {
        resetToken,
        hashedResetToken,
        resetTokenExpires,
    };
};