import jwt from "jsonwebtoken";

interface TokenPayload {
    id : string;
    role : string;
}

const generateToken = ({id, role} : TokenPayload) => {
    return jwt.sign({
        id, 
        role
    },
    process.env.JWT_SECRET!,
    {
        expiresIn : "7d",
    }
    )   
};

export default generateToken;