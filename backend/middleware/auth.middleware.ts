import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../user/user.model";
import { NextFunction, Request, Response } from "express";

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error("JWT_SECRET is not defined");
      }
      // Verify token
      const decoded = jwt.verify(token, secret) as JwtPayload;

      // @ts-ignore
      req.user = await UserModel.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ errors: [{ msg: "Not authorized, token failed" }] });
    }
  }
  if (!token) {
    res.status(401).json({ errors: [{ msg: "Not authorized, no token" }] });
  }
};

export default protect;
