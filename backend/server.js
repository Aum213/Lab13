const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ USE ENV VARIABLE (IMPORTANT)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

// Model
const Post = mongoose.model("Post", {
  title: String,
  content: String,
});

// CREATE
app.post("/posts", async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.json(post);
});

// READ
app.get("/posts", async (req, res) => {
  const data = await Post.find();
  res.json(data);
});

// UPDATE
app.put("/posts/:id", async (req, res) => {
  const updated = await Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE
app.delete("/posts/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// ✅ FIX PORT FOR RENDER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running"));