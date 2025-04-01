import user from "../models/userModels.js";
import argon2 from "argon2";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const { username, email, password, confirm_password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    if (password !== confirm_password) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    try {
        const hash = await argon2.hash(password);
        const newUser = await user.create({
            username,
            email,
            password: hash
        });
        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error registering user" });
    }
}

export const loginUser = async (req, res) => {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    try {
        const existingUser = await user.findOne({
            where: {
                [Op.or]: [{ username: identifier }, { email: identifier }]
            }
        });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const verifyPassword = await argon2.verify(existingUser.password, password);
        if (!verifyPassword) {
            return res.status(400).json({ message: "email, username or password is incorrect" });
        }
        const refresh_token = jwt.sign({
            id: existingUser.id,
            email: existingUser.email,
            username: existingUser.username
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

        const access_token = jwt.sign({
            id: existingUser.id,
            email: existingUser.email,
            username: existingUser.username
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "25s" });

        await user.update({ refresh_token }, {
            where: {
                id: existingUser.id
            }
        });
        res.cookie("refreshToken", refresh_token, {
            httpOnly: true,
            secure: false,
            samesite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(200).json({ message: "Login successful", access_token });
    } catch (error) {
        return res.status(500).json({ message: "Error logging in" });
    }
}

export const logoutUser = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(400).json({ message: "User not logged in" });
    }
    try {
        await user.update({ refresh_token: null }, {
            where: {
                refresh_token: refreshToken
            }
        });
        res.clearCookie("refreshToken");
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ message: "Error logging out" });
    }
}

export const generateAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(400).json({ message: "User not logged in" });
    }
    const loggedInUser = await user.findOne({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!loggedInUser) {
        return res.status(400).json({ message: "User not logged in" });
    }
    const access_token = jwt.sign({
        id: loggedInUser.id,
        email: loggedInUser.email,
        username: loggedInUser.username
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "25s" });
    res.status(200).json({ access_token });
}