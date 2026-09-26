const Blog = require("../models/Blog");



const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const author = req.user._id;
        const newBlog = new Blog({ title, content, author });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   

};

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username email').populate('comments.user', 'username email');
        res.status(200).json(blogs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
};


const getBlogById = async (req, res) => {
    try{
        
        const blog = await Blog.findById(req.params.id).populate('author', 'username email').populate('comments.user', 'username email');
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });   
    }
}

const updateBlog = async (req, res) => {
    try{
        const { title, content } = req.body;    

        const userId = req.user._id; 
        const userRole = req.user.role; 

        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        if (blog.author.toString() !== userId.toString() && userRole !== "admin") {
            return res.status(403).json({ message: "You are not authorized to update this blog" });
        }
        blog.title = title 
        blog.content = content 
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



const deleteBlog = async (req, res) => {
    try{
        
        const userId = req.user._id; 
        const userRole = req.user.role;

        const blog = await Blog.findById(req.params.id);    
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }   
        if (blog.author.toString() !== userId.toString() && userRole !== "admin") {
            return res.status(403).json({ message: "You are not authorized to update this blog" });
        }
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        res.send(deletedBlog)
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {       
        res.status(400).json({ message: error.message });
    }
};      






const addComment = async (req, res) => {
    // Implementation for adding a comment to a blog post
}

module.exports = {
    createBlog,
    getBlogs,
    getBlogById ,
    updateBlog ,
    deleteBlog
};