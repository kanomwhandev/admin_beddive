"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./blog.module.css";

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  author?: string;
  createdAt: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    if (res.ok) {
      const data = await res.json();
      setPosts(data);
    } else {
      console.error("Failed to fetch posts");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchPosts();
      } else {
        console.error("Failed to delete post");
      }
    }
  };

  const handleSort = () => {
    const sortedPosts = [...posts].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
    });
    setPosts(sortedPosts);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "latest" ? "oldest" : "latest");
  };

  const applyFilters = async () => {
    const queryParams = new URLSearchParams();
    queryParams.append("sortOrder", sortOrder);

    const res = await fetch(`/api/posts?${queryParams.toString()}`);
    if (res.ok) {
      const filteredPosts = await res.json();
      setPosts(filteredPosts);
    } else {
      console.error("Failed to fetch filtered posts");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.title}>Blog Posts</h1>
          <div className={styles.controls}>
            <Link href="/blog/create" className={styles.button}>
              Create New Post
            </Link>
            <div className={styles.sortControls}>
              <button onClick={toggleSortOrder} className={styles.button}>
                Sort: {sortOrder === "latest" ? "Latest" : "Oldest"}
              </button>
              <button onClick={applyFilters} className={styles.button}>
                Apply
              </button>
            </div>
          </div>
          <div className={styles.grid}>
            {posts.map((post) => (
              <div key={post.id} className={styles.card}>
                {post.imageUrl && (
                  <div className={styles.imageContainer}>
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>{post.title}</h2>
                  {post.author && (
                    <p className={styles.cardAuthor}>Author: {post.author}</p>
                  )}
                  <p className={styles.cardDate}>
                    Created: {new Date(post.createdAt).toLocaleString()}
                  </p>
                  <div className={styles.cardActions}>
                    <Link
                      href={`/blog/edit/${post.id}`}
                      className={`${styles.button} ${styles.editButton}`}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className={`${styles.button} ${styles.deleteButton}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
