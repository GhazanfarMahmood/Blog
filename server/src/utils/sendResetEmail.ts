import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service : "gmail",
    auth: {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASSWORD
    },
});

const sendResetEmail = async (email : string, resetUrl: string) => {
    await transporter.sendMail({
        from: `"Revision Admin" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Reset Your Password",
        html: `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Reset Your Password</title>
                </head>

                <body style="
                    margin: 0;
                    padding: 0;
                    background-color: #f6f7fb;
                    font-family: Arial, Helvetica, sans-serif;
                ">
                    <div style="
                        max-width: 600px;
                        margin: 40px auto;
                        background-color: #ffffff;
                        padding: 40px;
                        border-radius: 12px;
                    ">

                        <h1 style="
                            margin: 0 0 20px;
                            color: #29294b;
                            font-size: 28px;
                        ">
                            Reset Your Password
                        </h1>

                        <p style="
                            margin: 0 0 16px;
                            color: #555555;
                            font-size: 16px;
                            line-height: 1.6;
                        ">
                            We received a request to reset the password
                            for your admin account.
                        </p>

                        <p style="
                            margin: 0 0 25px;
                            color: #555555;
                            font-size: 16px;
                            line-height: 1.6;
                        ">
                            Click the button below to create a new password.
                            This link will expire in 15 minutes.
                        </p>

                        <a
                            href="${resetUrl}"
                            style="
                                display: inline-block;
                                padding: 12px 24px;
                                background-color: #5955d1;
                                color: #ffffff;
                                text-decoration: none;
                                border-radius: 8px;
                                font-size: 16px;
                                font-weight: bold;
                            "
                        >
                            Reset Password
                        </a>

                        <p style="
                            margin: 30px 0 0;
                            color: #777777;
                            font-size: 14px;
                            line-height: 1.6;
                        ">
                            If you did not request a password reset,
                            you can safely ignore this email.
                        </p>

                        <p style="
                            margin: 20px 0 0;
                            color: #999999;
                            font-size: 12px;
                            line-height: 1.5;
                        ">
                            This is an automated email. Please do not reply.
                        </p>

                    </div>
                </body>
            </html>
        `,
    });
};

export default sendResetEmail;