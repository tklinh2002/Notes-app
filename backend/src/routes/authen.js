import express from "express";
const router = express.Router();
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and registration
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User login
 *     description: Authenticate a user and return a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: objects
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad request (missing email/password or invalid credentials)
 */
router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: "email is required" });
  if (!password)
    return res.status(400).json({ message: "password is required" });
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });
  const crypto = await import("crypto");
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
  if (user.password !== hashedPassword)
    return res.status(400).json({ message: "Invalid password" });

  const {password:_, ...userWithoutPassword}=user.toObject()
  const token = await jwt.sign({ user: userWithoutPassword }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });

  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  console.log("Token:", token);
  res.json({ token });
});

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User registration
 *     description: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request (missing fields or user already exists)
 */
router.route("/register").post(async (req, res) => {
  const { email, password, name } = req.body;
  if (!email) {
    return res.status(400).json({ message: "email is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  const newUser = new User({ email, password, name });
  await newUser.save();
  res.status(201).json({ message: "User created successfully" });
});

export default router;
