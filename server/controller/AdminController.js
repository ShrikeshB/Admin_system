const AdminModel = require("../models/AdminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const addAdmin = async (req, res) => {
  try {
    const { uname, email, password } = req.body;
    const data = { uname, email, password };

    console.log(data);

    // Check if all required fields are provided
    if (!uname || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // check if the same admin exists
    const existingUser = await AdminModel.findOne({ email });
    if (existingUser) {
      console.log("Email is already registered");

      return res.status(400).json({ message: "Email is already registered" });
    }

    // hashing the password using bcrypt for security
    const salt = 10; // salt round
    const hashPassword = await bcrypt.hash(password, salt);

    // creating new admin
    const newAdmin = await new AdminModel({
      name: uname,
      email: email,
      password: hashPassword,
    });
    newAdmin.save();

    // send response
    console.log("new admin created");
    res.status(201).json({ message: "admin created successfully!" });
  } catch (err) {
    // here expections are handled!
    console.error("Error creating admin:", err); // Log error for debugging
    res
      .status(500)
      .json({ message: "Error creating admin", error: err.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  check for missing input field
    if (!email || !password) {
      console.log("Missing email or password in the request body.");
      return res
        .status(400)
        .json({ message: "Please provide both email and password." });
    }

    // Finding the user in the database
    const user = await AdminModel.findOne({ email });
    if (!user) {
      console.log("no such user!");
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    // comparing the provided password with the stored hash password
    const isMatch = await bcrypt.compare(password, user.password);

    // if the password doesn't  match then send an error message.
    if (!isMatch) {
      console.log("Invalid password.");
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // creating jwt token
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // payload
      process.env.SECRET_KEY, // secret key
      { expiresIn: "24h" } // expiration time
    );

    // set the JWT token in a cookie
    res.cookie("accessToken", token, {
      httpOnly: true, // Prevent JavaScript access
      secure: false, // Set to false for local development
      sameSite: "strict", // Protect against CSRF
    });

    console.log("Login successful");

    // Send a success response along with the token
    res.status(200).json({
      message: "Login successful",
      token, // Including the token in the response for convenience
    });
  } catch (err) {
    console.log("Error during login ", err);
    res
      .status(500)
      .json({ message: "internal error. Please try again later!" });
  }
};




module.exports = { addAdmin, loginAdmin };
