import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import User from "../models/User.js"
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"


export const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Please fill all required fields");
    }

    if (password.length < 6) {
        res.status(400);
        throw new Error("password must be 6 characters");
    }


    // check if user email is already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("Email already exists");
    }

    // Password hashing
    const hash = bcrypt.hashSync(password, 10);


    // Creating new User
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash
    })
    await newUser.save();
    res.status(200).send(newUser);
})

export const login = async (req, res, next) => {

    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return next(createError(404, "User not Found"));
        }


        const isPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isPassword) {
            return next(createError(400, "Wrong username or password"));
        }

        //   Generate Token
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);


        //  Send HTTP-only cookie
        res.
            cookie("access_token", token, {
                httpOnly: true,
            }).
            status(200).json(user);
    } catch (err) {
        next(err);
    }

}
