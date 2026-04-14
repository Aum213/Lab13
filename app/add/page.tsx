"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API || "http://localhost:5000/posts";

  const addPost = async () => {
    if (!title || !content) {
      alert("Please fill in both title and content");
      return;
    }

    await axios.post(API, { title, content });
    alert("Added!");
    router.push("/blog");
  };

return (
  <div>
    <h1>Add Blog</h1>

    <div className="card">
      <input
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      <textarea
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />

      <button onClick={addPost}>Submit</button>
    </div>
  </div>
);
}