"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../sounds.module.css";

export default function CreateSound() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setTitle(selectedFile.name);

      // Get file duration
      const audioDuration = await getAudioDuration(selectedFile);
      setDuration(audioDuration);
    }
  };

  const getAudioDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.onloadedmetadata = () => {
        resolve(audio.duration);
      };
      audio.src = URL.createObjectURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("กรุณาเลือกไฟล์");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("author", author);
    formData.append("category", category); // Make sure to include category
    if (duration !== null) {
      formData.append("duration", duration.toString());
    }

    try {
      const res = await fetch("/api/sounds", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        router.push("/sounds");
      } else {
        const errorData = await res.json();
        setError(
          `ไม่สามารถสร้างเสียงได้: ${
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
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Create New Sound</h1>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="author" className={styles.label}>
            Author
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="category" className={styles.label}>
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className={styles.input}
          >
            <option value="">Select a category</option>
            <option value="MUSIC">Music</option>
            <option value="NATURE">Nature</option>
            <option value="BRAINWAVE">Brainwave</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="duration" className={styles.label}>
            Duration (seconds)
          </label>
          <input
            type="number"
            id="duration"
            value={duration === null ? "" : duration.toFixed(2)}
            readOnly
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="file" className={styles.label}>
            Audio File
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            required
            accept="audio/*"
            className={styles.input}
          />
        </div>
        <button
          type="submit"
          className={`${styles.button} ${styles.submitButton}`}
        >
          Create Sound
        </button>
      </form>
    </div>
  );
}
