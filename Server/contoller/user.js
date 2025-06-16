const PfUser = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const registerForm = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await PfUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt); // OTP 6-digit
    const user = new PfUser({
        name,
        email,
        password: hashPassword
        });
        const savedUser = await user.save();
    
    const token = jwt.sign({id:user._id,role:user.role}, process.env.JWT_SECRET, { expiresIn: '5m' });

    

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 24 *60* 60 * 1000 // 24 hours
    });

    
    res.status(200).json({ message: "Registration Successful", token ,user:savedUser});
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(400).send({ message: error.message });
  }
};

const login = async(req,res)=>{
    const { email, password } = req.body;

  try {
    const user = await PfUser.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 24*60*60*1000 // 1 day
    })

    res.json({ message:'Logged in successfully' ,token,user});
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { registerForm, login };