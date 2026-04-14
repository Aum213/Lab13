"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  _id: string;
  title: string;
  content: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  const API = process.env.NEXT_PUBLIC_API || "http://localhost:5000/posts";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(API);
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [API]);

  const deletePost = async (id: string) => {
    try {
      await axios.delete(`${API}/${id}`);
      setPosts(posts.filter(post => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const editPost = async (id: string, t: string, c: string) => {
    const newTitle = prompt("Edit title", t);
    const newContent = prompt("Edit content", c);

    if (!newTitle || !newContent) return;

    try {
      await axios.put(`${API}/${id}`, {
        title: newTitle,
        content: newContent,
      });

      setPosts(posts.map(post =>
        post._id === id
          ? { ...post, title: newTitle, content: newContent }
          : post
      ));
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  return (
  <div>
    <h1>Blog</h1>

    {posts.map((p: Post) => (
      <div key={p._id} className="card">
        <h3>{p.title}</h3>
        <p>{p.content}</p>

        <button onClick={() => editPost(p._id, p.title, p.content)}>
          Edit
        </button>

        <button onClick={() => deletePost(p._id)}>
          Delete
        </button>
      </div>
    ))}
  </div>
);
}