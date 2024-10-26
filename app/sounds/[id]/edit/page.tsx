"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../editsounds.module.css";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

interface Sound {
  id: number;
  title: string;
  fileUrl: string;
  author: string;
  category: { name: string } | null;
  duration: number | null;
  fileSize: number;
  createdAt: string;
  updatedAt: string;
}

export default function EditSound({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [sound, setSound] = useState<Sound | null>(null);
  const [title, setTitle] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSound();
  }, []);

  const fetchSound = async () => {
    try {
      const res = await fetch(`/api/sounds/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setSound(data);
        setTitle(data.title);
        setFileUrl(data.fileUrl);
        setAuthor(data.author || "");
        setCategory(data.category?.name || "");
        setDuration(data.duration);
      } else {
        setError("Failed to fetch sound");
      }
    } catch (error) {
      setError("Error fetching sound");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/sounds/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          category, // Make sure to include category
          duration,
        }),
      });

      if (res.ok) {
        router.push("/sounds");
      } else {
        const errorData = await res.json();
        setError(
          `ไม่สามารถอัปเดตเสียงได้: ${
            errorData.error || "ข้อผิดพลาดที่ไม่ทราบสาเหตุ"
          }`
        );
      }
    } catch (error) {
      setError(
        `เกิดข้อผิดพลาดในการส่งแบบฟอร์ม: ${
          error instanceof Error ? error.message : "ข้อผิดพลาดที่ไม่ทราบสาเหตุ"
        }`
      );
    }
  };

  if (error) return <div className={styles.error}>{error}</div>;
  if (!sound) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <h1 className={styles.title}>Edit Sound</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="fileUrl">File URL</label>
            <input
              type="text"
              id="fileUrl"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              <option value="MUSIC">Music</option>
              <option value="NATURE">Nature</option>
              <option value="BRAINWAVE">Brainwave</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="duration">Duration (seconds)</label>
            <input
              type="number"
              id="duration"
              value={duration !== null ? duration.toFixed(2) : ""}
              onChange={(e) => setDuration(parseFloat(e.target.value))}
              required
              step="0.01"
            />
          </div>
          <div className={styles.infoGroup}>
            <p>Created: {new Date(sound.createdAt).toLocaleString()}</p>
            <p>Updated: {new Date(sound.updatedAt).toLocaleString()}</p>
            <p>File Size: {(sound.fileSize / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <audio controls src={fileUrl} className={styles.audioPlayer}>
            Your browser does not support the audio element.
          </audio>
          <button type="submit" className={styles.button}>
            Update Sound
          </button>
        </form>
      </div>
    </div>
  );
}
