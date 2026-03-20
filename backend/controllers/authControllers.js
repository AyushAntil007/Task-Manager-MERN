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

//Register

exports.register= async (req, res)=> {
    try {
        const {name, email, password}= req.body;

        const existingUser = await User.findOne({email});
        if (existingUser) {
        return res.status(400).json({ msg: "User already exists" });
        }

        const  hashPassword = await bcrypt.hash(password, 10);

        const user = await User.Create({
            name,
            email,
            hashPassword
        });
    }catch(error){
        res.status(500).json({ msg: error.message });
    }
};

//Login

exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ msg: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid password" });
        }

        //token

        const token = jwt.sign(
            {id: user._id, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );

        res.json({
            msg: "Login successful",
            token
        });

    } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
