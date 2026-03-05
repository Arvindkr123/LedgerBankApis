import jwt from "jsonwebtoken"
import UserModel from './../models/user.models.js';
import TokenBlackListModel from "../models/blackListModels.js";

async function authMiddleware(req, res, next) {

    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const blackListToken = await TokenBlackListModel.findOne({ token })
    if (blackListToken) {
        return res.status(401).json({ message: "Unauthorized: Invalid token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.userId);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}

export async function authSystemUserMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        // ✅ Check if Authorization header exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized: No token provided",
            });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: no token provided" });
        }

        const blackListToken = await TokenBlackListModel.findOne({ token })
        if (blackListToken) {
            return res.status(401).json({ message: "Unauthorized: Invalid token provided" });
        }

        // ✅ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ Find user
        const user = await UserModel.findById(decoded.userId).select("+systemUser");

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized: User not found",
            });
        }

        // ✅ Check system user role
        if (!user.systemUser) {
            return res.status(403).json({
                message: "Forbidden: Not a system user",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Auth error:", error.message);

        return res.status(401).json({
            message: "Unauthorized: Invalid or expired token",
        });
    }
}
export default authMiddleware;
