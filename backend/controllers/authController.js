// routes works...
// router.post('/register', register);
// controller .....
// exports.register = async (req, res) => {
//   // logic here
// };

// Routes → URL issue
// Controllers → logic issue


const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {

  //debug.....
  console.log("REGISTER HIT");
  console.log("BODY:", req.body);

  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // check existing user

    //debug...
    console.log("checking existing user")
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // hash password

    console.log("hashing password")
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user

    console.log("creating user")
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      msg: "User registered successfully",
      userId: user._id
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      msg: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};