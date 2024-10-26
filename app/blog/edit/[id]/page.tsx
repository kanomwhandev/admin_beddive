"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../../editpost.module.css";
import { motion } from "framer-motion";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  author?: string;
}

export default function EditPostPage({
  params,
}: Readonly<{ params: { id: string } }>) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const res = await fetch(`/api/posts/${params.id}`);
    if (res.ok) {
      const data = await res.json();
      setPost(data);
      setTitle(data.title);
      setContent(data.content);
      setImageUrl(data.imageUrl || "");
      setAuthor(data.author || "");
      setCategoryId(data.categoryId?.toString() || "");
      setPreviewImage(data.imageUrl || "");
    } else {
      console.error("Failed to fetch post");
    }
  };

  const fetchPexelsImage = async () => {
    if (imageUrl) {
      try {
        setPreviewImage(imageUrl);
      } catch (error) {
        console.error("Failed to set image URL", error);
      }
    }
  };

  const searchPexelsImage = async () => {
    if (imageUrl) {
      try {
        const res = await fetch(
          `/api/pexels?query=${encodeURIComponent(imageUrl)}`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.photos && data.photos.length > 0) {
            const newImageUrl = data.photos[0].src.medium;
            setPreviewImage(newImageUrl);
            setImageUrl(newImageUrl);
          } else {
            console.log("No images found on Pexels");
          }
        }
      } catch (error) {
        console.error("Failed to fetch image from Pexels", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/posts/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        imageUrl,
        author,
        categoryId: parseInt(categoryId),
      }),
    });
    if (res.ok) {
      router.push("/blog");
    } else {
      console.error("Failed to update post");
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={styles.main}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className={styles.content}>
          <motion.h1
            className={styles.title}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Edit Post
          </motion.h1>
          <motion.form
            onSubmit={handleSubmit}
            className={styles.form}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.div
              className={styles.formGroup}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </motion.div>
            <motion.div
              className={styles.formGroup}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <label htmlFor="content">Content:</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </motion.div>
            <motion.div
              className={styles.formGroup}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <label htmlFor="imageUrl">Image URL or Pexels Search:</label>
              <div className={styles.imageUrlInput}>
                <input
                  type="text"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <button
                  type="button"
                  onClick={fetchPexelsImage}
                  className={styles.button}
                >
                  Set Image
                </button>
                <button
                  type="button"
                  onClick={searchPexelsImage}
                  className={styles.button}
                >
                  Search Pexels
                </button>
              </div>
            </motion.div>
            <motion.div
              className={styles.formGroup}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <label htmlFor="author">Author:</label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </motion.div>
            <motion.div
              className={styles.formGroup}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            ></motion.div>
            <motion.button
              type="submit"
              className={styles.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Update Post
            </motion.button>
          </motion.form>
          {previewImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Image
                src={previewImage}
                alt="Preview"
                width={300}
                height={200}
                className={styles.imagePreview}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
