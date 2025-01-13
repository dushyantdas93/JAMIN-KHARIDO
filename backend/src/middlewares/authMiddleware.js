import jwt, { decode } from "jsonwebtoken";
import { Customer } from "../models/customer.js";
import { Agent } from "../models/agent.js";
import { decryptToken } from "../utils/crypto.js";
import { generateAccessToken } from "../utils/token.js";

class AuthMiddleware {
  customerMiddleware = async (req, res, next) => {
    try {
      const token = req.cookies.customerToken || req.headers.Authorization;

      if (!token) {
        return res
          .status(401)
          .json({ error: "Unauthorized: No token provided" });
      }

      // Decode the token
      const decToken = await decryptToken(token, process.env.SECRET_KEY);

      const decoded = jwt.verify(decToken, process.env.JWT_SECRET);
      //  console.log(decoded)

      // Find the customer and check token and expiry
      const customer = await Customer.findOne({
        _id: decoded._id,
        token: decToken,
      }).select("-password ");

      // console.log(customer)

      if (!customer) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
      }

      // Check if token is expired
      if (new Date() > customer.tokenExpiry) {
        return res.status(401).json({ error: "Unauthorized: Token expired" });
      } else {
        // Token is still valid
        res.status(200);
      }

      // Attach customer info to the request
      req.customer = customer;
      // console.log(req.customer)
      next();
    } catch (error) {
      console.error("Error in authMiddleware:", error);
      return res.status(401).json({ error: "Unauthorized" });
    }
  };

  agentMiddleware = async (req, res, next) => {
    try {
      const token = req.cookies.agentToken || req.headers.Authorization;
      if (!token) {
        return res
          .status(401)
          .json({ error: "Unauthorized: No token provided" });
      }

      // Decode the token
      const decToken = decryptToken(token, process.env.SECRET_KEY);
      // console.log("decToken", decToken);
      const decoded = jwt.verify(decToken, process.env.ACCESS_TOKEN_SECRET);
      if (!decoded) {
        jwt.verify(
          agent.token,
          process.env.REFRESH_TOKEN_SECRET,
          async (err, decoded) => {
            if (err)
              return res
                .status(403)
                .json({ message: "Invalid or expired refresh token" });

            // Generate a new access token
            const newAccessToken = generateAccessToken({
              email: agent.email,
              _id: agent._id,
            });

            // res.json({ accessToken: newAccessToken });
          }
        );
      }

      const agent = await Agent.findOne({
        _id: decoded._id,
        token: decToken,
      }).select("-password");

      if (!agent) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
      }

      // Check if token is expired
      if (new Date() > agent.tokenExpiry) {
        return res.status(401).json({ error: "Unauthorized: Token expired" });
      }

      // Attach customer info to the request
      req.agent = agent;
      console.log("passed");
      next();
    } catch (error) {
      console.error("Error in authMiddleware:", error);
      return res.status(401).json({ error: "Unauthorized" });
    }
  };
}

export const authMiddleware = new AuthMiddleware();
