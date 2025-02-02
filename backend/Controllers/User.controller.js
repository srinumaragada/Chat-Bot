const User = require("../models/User.model");


 const RegisterUser= async (req,res) => {
    const {name,email,password}=req.body;

    try {
        const CheckUser = await User.findOne({email})
        if (CheckUser) {
            return res.status(404).json({
              success:false,
              message: "User already exists !! Please try with another email",
            });
          }
          
          const newUser = new User({
            name,email,password
          })
          await newUser.save()
          res.status(200).json({
            success:true,
            data:{
                newUser:newUser,
            }
          })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message,
          });
    }
}

module.exports={
    RegisterUser
}