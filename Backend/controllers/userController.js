
import { User } from "../Models/user_model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import getDataUri from "../utils/data_uri.js";
import cloudinary from "../utils/cloudinary.js";


export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // 1️⃣ Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // 2️ Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email"
      });
    }

    // 3️ Password validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
      });
    }

    // 4️ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }
const hashpassword=await bcrypt.hash(password,10)
    // 5️ Create user
    await User.create({
      firstName,
      lastName,
      email,
      password:hashpassword
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to register"
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️ Validate fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2️ Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 3️ Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 4️ Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        message: `Welcome back ${user.firstName}`,
        user
      });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};


export const logout=async (__,res)=>{
try {
    return res.status(200).cookie("token","",{maxAge:0}).json({
        message:"logout Successfully",
        success:true
    })
} catch (error) {
    console.log(error)
}
}

export const updateProfile=async(req,res)=>{
  try {

    const userId=req.id
    const {firstName,lastName,occupation,bio,instagram,facebook,linkedin,github}=req.body;
    const file=req.file;

    const fileUri=getDataUri(file)
    let cloudResponse=await cloudinary.uploader.upload(fileUri)
    const user =await User.findById(userId).select("-password")





    if(!user){
      return res.status(404).json({
        message:"User not Fouont",
        success:false
      })

    }
    //updating data
    if(firstName) user.firstName=firstName;
    if(lastName) user.lastName=lastName;
    if(occupation) user.occupation=occupation;
    if(bio) user.bio=bio;
    if(instagram) user.instagram=instagram;
    if(facebook) user.facebook=facebook;
    if(linkedin) user.linkedin=linkedin;
    if(github) user.github=github;
    if(file) user.photoUrl=cloudResponse.secure_url

    await user.save()
    return res.status(200).json({
      message:"Profile updated successfully",
      success:true,
      user
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:"Failed to Update Profile",
      success:false
    })
    
  }
}

// export const updateProfile = async (req, res) => {
//   try {
//     const userId = req.id;
//     const {
//       firstName,
//       lastName,
//       occupation,
//       bio,
//       instagram,
//       facebook,
//       linkedin,
//       github,
//     } = req.body;

//     const file = req.file;
    


//     const user = await User.findById(userId).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//         success: false,
//       });
//     }

//     // 🔹 Upload only if file exists
//     if (file) {
//       const fileUri = getDataUri(file);
//       const cloudResponse = await cloudinary.uploader.upload(fileUri);
//       user.photoUrl = cloudResponse.secure_url;
//     }

//     // 🔹 Update fields safely
//     if (firstName) user.firstName = firstName;
//     if (lastName) user.lastName = lastName;
//     if (occupation) user.occupation = occupation;
//     if (bio) user.bio = bio;
//     if (instagram) user.instagram = instagram;
//     if (facebook) user.facebook = facebook;
//     if (linkedin) user.linkedin = linkedin;
//     if (github) user.github = github;

//     await user.save();

//     return res.status(200).json({
//       message: "Profile updated successfully",
//       success: true,
//       user,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "Failed to update profile",
//       success: false,
//     });
//   }
// };

export const getAllUser=async(req,res)=>{
  try {
    const getUser=await User.find().select("-password");//exclude password field
   
     return res.status(200).json({
      success:true,
         message: "User list fetched successfully",
        total: getUser.length,
        getUser
      })
    
  } catch (error) {
    console.log("Error fetching user list",error);
    res.status(500).json({
        success: false,
        message: "Failed to fetch users"
      });
  }
}