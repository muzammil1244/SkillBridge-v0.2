import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,  
      },
      password: {
        type: String,
        required: true,
      },

      roll:{

        type:String,
        enum:['Candidate','Recruiter'],
        required:true
      },
      profileImage:{
 type :String,
 default:"1753378150931.png"
        
      } 
});

const User = mongoose.model("User", userSchema);

export default User; 
