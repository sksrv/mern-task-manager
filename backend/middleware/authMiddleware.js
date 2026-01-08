import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    try {
        let token;
        //
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            // Extract token from "Bearer <token>"
            token = req.headers.authorization.split(" ")[1];
        }
        if(!token){
            return res.status(401).json({ message: "Not authorized, token missing" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(500).json({ message: "Not authorized, token invalid" });
    }
};

export default authMiddleware;