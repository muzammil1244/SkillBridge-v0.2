import  User  from "../models/User.js";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { uploadToCloudinary } from "../middleware/multersetup.js";

// register with profile image 

export async function register(req, res) {

      


  try {
    const { name, email, password , roll } = req.body;
    let profileImage = null
      if(req.file){

     profileImage = req.file ? await uploadToCloudinary(req.file.buffer,"skillbridgev0.2"):"" ;

      }else{
        profileImage ="https://res.cloudinary.com/dkuqude1b/image/upload/v1776100827/Colorful_gradient_profile_avatar_wpdsqx.png"
      }
    const hashedPassword = await hash(password, 10);
console.log( name, email, hashedPassword, roll,profileImage)

    const user = new User({ name, email, password: hashedPassword, roll,profileImage});
    await user.save();
    res.status(201).json({user});
  } catch (err) {
    res.status(400).json({ error: "Registration failed", details: err.message });
  }
}

export async function login(req, res) {
  console.log("Request body:", req.body);

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(401).send("user not found");

    const ismatch = await compare(password, user.password);

    if (!ismatch) return res.status(401).send("invalid pass");

    const token = jwt.sign(
      { userID: user._id, roll: user.roll },
      process.env.JWT_SECRET,
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Login failed", details: error.message });
  }
}




