const Product = require('../models/Product'); 
const userSchema = require('../models/User'); 
const Subscription = require("../models/subscription");

const handleuserSignUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phNumber, address } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
                return res.status(400).json({ message: "Email, Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                phNumber,
                address
                });
                
        return res.status(201).json({ message: "user registered successfully", user: newUser });
    } catch (error) {
        console.error("Error in user signup:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    } 
};


const handleuserLogin = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: "Invalid email or password" });
        }else{
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid email or password" });
            }else{
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
                return res.status(200).json({ message: "Login successful", token });
            }
        }
    }catch{
        console.error("Error in user login:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

};


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ stock: { $gt: 0 } }) 
                                 .sort({ soldCount: -1 }); 
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
};


const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product details', error: err });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch active subscription if any
    const subscription = await Subscription.findOne({ userId: user._id, status: "active" });

    res.status(200).json({ user, subscription });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};


module.exports = { getAllProducts, getProductById ,handleuserSignUp,handleuserLogin,getUserProfile};
