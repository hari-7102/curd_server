const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();

app.use(express.json());



app.use(cors({
    origin: "http://localhost:5173", 
    
  credentials: true                // allow cookies
}));


app.post("/login",async (req, res) => {

    try{
        
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }

        const user =await User.findOne({ email });

        if(email.indexOf('@gmail.com') === -1){
            return res.status(400).json({ message: "Invalid email format" });
        }

        if(!user){
            return res.status(400).json({ message: "User not found" });
        }

        

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials" });
        }

        

        const accesstoken = generateaccessToken(user);
        const refreshtoken = generaterefreshToken(user);

        

        res.clearCookie("refreshToken");  
        res.cookie("refreshToken", refreshtoken, {
          httpOnly: true,
          secure: false,   // true in production
          
        });

        console.log("user", user);

        return res.json({ 
            accesstoken,
            user_id: user._id,
            role: user.role,
            username: user.username,
         });

    }

    catch (error) {
        res.status(400).json({ message: error.message });
    }

});

mongoose
  .connect("") /// your cluster url
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error);
  });

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});