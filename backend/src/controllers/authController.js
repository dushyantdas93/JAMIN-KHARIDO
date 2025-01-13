import { Customer } from "../models/customer.js";
import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { Agent } from "../models/agent.js";
import { encryptToken } from "../utils/crypto.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
const customerLoginSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  email: z.string().email({ message: "Invalid email format" }),
});

const agentLoginSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  email: z.string().email({ message: "Invalid email format" }),
});

export const customerLogin = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;

    const parsed = customerLoginSchema.safeParse({
      email,
      password,
    });

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }

    const isPresent = await Customer.findOne({
      email: parsed.data.email,
    }).select("+password");
    if (!isPresent) {
      return res.status(400).json({ error: "not present" });
    }
    const matched = await bcrypt.compare(
      parsed.data.password,
      isPresent.password
    );

    if (matched) {
      const expiryDuration = 24 * 60 * 60 * 1000; // 1 day in milliseconds
      let oldtoken = await jwt.sign(
        {
          email: isPresent.email,
          _id: isPresent._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" } // Set token expiration
      );

      const token = await encryptToken(oldtoken, process.env.SECRET_KEY);

      isPresent.token = oldtoken; // Assuming the Customer model has a `token` field
      isPresent.tokenExpiry = new Date(Date.now() + expiryDuration);
      await isPresent.save();

      return res
        .status(200)
        .cookie("customerToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Use secure cookies in production
          sameSite: "Strict",
        })
        .json({
          message: "logged in successfully",
          token,
          isPresent,
        });
    } else {
      return res.status(400).json({ message: "invalid credential" });
    }
  } catch (error) {
    console.error("Error during customer login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const customerLogout = async (req, res) => {
  try {
    // Clear the "customerToken" cookie
    res.clearCookie("customerToken", { httpOnly: true, secure: true });

    // Respond with a success message
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during customer logout:", error);

    // Handle any unexpected errors
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const agentLogin = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;

    const parsed = agentLoginSchema.safeParse({
      email,
      password,
    });

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }

    const isPresent = await Agent.findOne({
      email: parsed.data.email,
    }).select("+password");

    if (!isPresent) {
      return res.status(400).json({ error: "not present" });
    }

    const matched = await bcrypt.compare(
      parsed.data.password,
      isPresent.password
    );

    if (matched) {
      const refreshToken = await generateRefreshToken({
        email: isPresent.email,
        _id: isPresent._id,
      });

      const accessToken = await generateAccessToken({
        email: isPresent.email,
        _id: isPresent._id,
      });

      console.log(accessToken);

      const token = await encryptToken(accessToken, process.env.SECRET_KEY);

      isPresent.token = refreshToken;

      await isPresent.save();
      const agent = await Agent.findById(isPresent._id).select(
        "-password -token"
      );
      return res
        .status(200)
        .cookie("agentToken", token, { httpOnly: true, secure: true })
        .json({
          message: "logged in successfully",
          token,
          agent,
        });
    } else {
      return res.status(400).json({ message: "invalid credential" });
    }
  } catch (error) {
    console.error("Error during customer login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const agentLogout = async (req, res) => {
  try {
    res.clearCookie("agentToken", { httpOnly: true, secure: true });

    // Respond with a success message
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during agent logout:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
