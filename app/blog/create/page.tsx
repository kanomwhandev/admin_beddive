"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../blog.module.css";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Category {
  id: number;
  name: string;
}

export default function CreatePost() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    content: "",
    imageUrl: "",
    author: "",
  });
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {}, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "imageUrl") {
      setPreviewImage(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/blog");
      } else {
        const errorData = await res.json();
        console.error("Failed to create post:", errorData);
        // แสดง error message ให้ user เห็น
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // แสดง error message ให้ user เห็น
    }
  };

  const fetchPexelsImage = async () => {
    if (form.imageUrl) {
      try {
        // ใช้ URL ที่ป้อนเข้ามาโดยตรง
        setPreviewImage(form.imageUrl);
        setForm((prevForm) => ({ ...prevForm, imageUrl: form.imageUrl }));
      } catch (error) {
        console.error("Failed to set image URL", error);
      }
    }
  };

  const searchPexelsImage = async () => {
    if (form.imageUrl) {
      try {
        const res = await fetch(
          `/api/pexels?query=${encodeURIComponent(form.imageUrl)}`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.photos && data.photos.length > 0) {
            const imageUrl = data.photos[0].src.medium;
            setPreviewImage(imageUrl);
            setForm((prevForm) => ({ ...prevForm, imageUrl: imageUrl }));
          } else {
            console.log("No images found on Pexels");
          }
        }
      } catch (error) {
        console.error("Failed to fetch image from Pexels", error);
      }
    }
  };
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Create New Post</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content" className={styles.label}>
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            className={styles.textarea}
            rows={5}
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="imageUrl" className={styles.label}>
            Image URL or Pexels Search
          </label>
          <div className={styles.imageUrlInput}>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              className={styles.input}
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
        </div>
        {previewImage && (
          <div className={styles.imagePreview}>
            <Image
              src={previewImage}
              alt="Preview"
              width={300}
              height={200}
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
        <div className={styles.formGroup}>
          <label htmlFor="author" className={styles.label}>
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={form.author}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <button
          type="submit"
          className={`${styles.button} ${styles.submitButton}`}
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
