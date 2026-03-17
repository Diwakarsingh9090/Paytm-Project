
const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const JWT_SECRET = require("../config");
const router = express.Router();



const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6).max(100),
  firstName: zod.string().min(1).max(50),
  lastName: zod.string().min(1).max(50)
});


router.post("/signup", async (req, res) => {
    const {success} = signupSchema.safeParse(req.body)
    // restricting the user to use an email that is already taken and also validating the inputs using zod
    if(!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const existingUser = await User.findOne({ 
        username: req.body.username 
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/ Incorrect inputs"
        });
    }

    // creating a new user and generating a JWT token for the user
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    const userId = user._id;

    const token = jwt.sign({ 
        userId 
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})
//Here we can do some otp logic for new user verification
//  but for now we are just creating a user and generating
//  a token for the user without any verification
//  assuming email given by the user is correct and valid.
//  We can also add some password hashing logic
//  for better security but for now we are just storing the password
//  as it is in the database which is not recommended for production use.

module.exports = router;

