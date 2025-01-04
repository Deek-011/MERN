const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authMiddleware = require("./middleware/auth");
const Folder = require("./schema/folderSchema.js");
const User = require("./schema/userSchema");
const Form = require("./schema/formSchema");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors(
  {
    origin: ["https://form-builder-backend-nu.vercel.app"],
    methods: ["POST", "GET"],
    credentials:true
  }

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Root route for testing
app.get("/", (req, res) => {
  res.send("API is working!");
});

// User Signup
app.post("/api/v1/user/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const normalizedEmail = email.toLowerCase();
    const isUserExist = await User.findOne({ email: normalizedEmail });
    if (isUserExist) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email: normalizedEmail, password: hashedPassword });

    res.status(200).json({ message: "User created" });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ message: "Error creating user", error });
  }
});

// User Login
app.post("/api/v1/user/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in", error });
  }
});

// Folder Routes
app.get("/api/v1/folders", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const folders = await Folder.find({ userId });
    return res.status(200).json({ folders });
  } catch (error) {
    console.error("Error fetching folders:", error);
    return res.status(500).json({ message: "Failed to fetch folders", error });
  }
});

app.get("/api/v1/folders/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const folder = await Folder.findById(id);
    if (!folder) return res.status(404).json({ message: "Folder not found" });

    return res.status(200).json({ folder });
  } catch (error) {
    console.error("Error fetching folder:", error);
    return res.status(500).json({ message: "Failed to fetch folder", error });
  }
});

app.post("/api/v1/folder", authMiddleware, async (req, res) => {
  const { foldername } = req.body;
  const userId = req.user.id;

  try {
    const isFolderExist = await Folder.findOne({ foldername });
    if (isFolderExist) return res.status(400).json({ message: "Folder already exists" });

    const folder = await Folder.create({ foldername, userId });
    return res.status(200).json({ message: "Folder created", folder });
  } catch (error) {
    console.error("Error creating folder:", error);
    return res.status(500).json({ message: "Error creating folder", error });
  }
});

app.delete("/api/v1/folders/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const folder = await Folder.findById(id);
    if (!folder) return res.status(404).json({ message: "Folder not found" });
    if (userId !== folder.userId.toString())
      return res.status(403).json({ message: "Not authorized to delete this folder" });

    await Folder.deleteOne({ _id: id });
    res.status(200).json({ message: "Folder deleted" });
  } catch (error) {
    console.error("Error deleting folder:", error);
    return res.status(500).json({ message: "Error deleting folder", error });
  }
});

// Form Routes
app.post("/api/v1/forms", authMiddleware, async (req, res) => {
  const { formname, fields, folderId } = req.body;
  const userId = req.user.id;

  if (!formname || !fields || !folderId) {
    return res.status(400).json({ error: "formname, fields, and folderId are required" });
  }

  try {
    const newForm = new Form({ formname, fields, userId, folderId });
    await newForm.save();
    res.status(200).json({ message: "Form created successfully", newForm });
  } catch (err) {
    console.error("Error creating form:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// User Update
app.post("/api/v1/user/update", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { username, email, oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (username) user.username = username;
    if (email) user.email = email;

    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) return res.status(400).json({ message: "Incorrect old password" });
      if (oldPassword === newPassword) return res.status(400).json({ message: "Password can't be the same" });

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error });
  }
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
