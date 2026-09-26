

const User = require("../models/User");
const bcrypt = require('bcrypt');
const createUser = async (req, res) => {   

    try{
        const { username, email, password, role } = req.body;

        if(!username || !email || !password ){
            return res.status(400).json({ message: "All fields are required" });
        }
        
        if(email.indexOf('@gmail.com') === -1){
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password:hash, role });
        await newUser.save();
        res.status(201).json(newUser);  
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getuserbyid = async (req, res) => {   
    try{
        const users = await User.findById(req.params.id).select('-password'); // Exclude passwords     
        res.status(200).json(users);  
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude passwords   
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }  
};


const updateUser = async (req, res) => {
    try{
        const { username, email, password, role } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.username = username || user.username;
        user.email = email || user.email;
        user.password = password || user.password;
        user.role = role || user.role;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteuser = async(req, res) => {
    try{
        const  id  = req.params.id
        console.log("ifddd", id)
        const user = await User.findById(id)
        if(!user) {
            return res.status(404).json({message : "user not found"})
        }
        const userde = await User.findByIdAndDelete(id)
        res.status(200).json(userde)

    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

module.exports = { 

    createUser ,
    getuserbyid ,
    getAllUsers ,
    updateUser ,
    deleteuser

 };