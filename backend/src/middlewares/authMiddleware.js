import jwt from "jsonwebtoken";
import { Customer } from "../models/customer.js";
import { Agent } from "../models/agent.js";

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
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //  console.log(decoded)

      // Find the customer and check token and expiry
      const customer = await Customer.findOne({
        _id: decoded._id,
        token,
      });

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
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //  console.log(decoded)

      // Find the customer and check token and expiry
      const agent = await Agent.findById({
        _id: decoded._id
    
      });

      // console.log(customer)

      if (!agent) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
      }

      // Check if token is expired
      if (new Date() > agent.tokenExpiry) {
        return res.status(401).json({ error: "Unauthorized: Token expired" });
      } else {
        // Token is still valid
        res.status(200);
      }

      // Attach customer info to the request
      req.agent = agent;
      // console.log(req.customer)
      next();
    } catch (error) {
      console.error("Error in authMiddleware:", error);
      return res.status(401).json({ error: "Unauthorized" });
    }
  };
}

export const authMiddlewareInstance = new AuthMiddleware();
