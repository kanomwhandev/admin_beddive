"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./sounds.module.css";

interface Sound {
  id: number;
  title: string;
  fileUrl: string;
  author: string;
  Category: {
    name: string;
  } | null;
  duration: number;
  fileSize: number;
  createdAt: string;
  updatedAt: string;
}

export default function SoundsPage() {
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    fetchSounds();
  }, []);

  const fetchSounds = async () => {
    const res = await fetch("/api/sounds");
    if (res.ok) {
      const data = await res.json();
      setSounds(data);
    } else {
      console.error("Failed to fetch sounds");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this sound?")) {
      try {
        const res = await fetch(`/api/sounds/${id}`, { method: "DELETE" });
        if (res.ok) {
          fetchSounds(); // Refresh the list after deletion
        } else {
          const errorData = await res.json();
          console.error("Failed to delete sound:", errorData.error);
        }
      } catch (error) {
        console.error("Error deleting sound:", error);
      }
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "latest" ? "oldest" : "latest");
  };

  const applyFilters = async () => {
    const queryParams = new URLSearchParams();
    queryParams.append("sortOrder", sortOrder);
    if (selectedCategory) {
      queryParams.append("category", selectedCategory);
    }

    const res = await fetch(`/api/sounds?${queryParams.toString()}`);
    if (res.ok) {
      const filteredSounds = await res.json();
      setSounds(filteredSounds);
    } else {
      console.error("Failed to fetch filtered sounds");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Sound Library</h1>
      <div className={styles.controls}>
        <Link href="/sounds/create" className={styles.button}>
          Create New Sound
        </Link>
        <div className={styles.sortControls}>
          <button onClick={toggleSortOrder} className={styles.button}>
            Sort: {sortOrder === "latest" ? "Latest" : "Oldest"}
          </button>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.select}
          >
            <option value="">All Categories</option>
            <option value="MUSIC">Music</option>
            <option value="NATURE">Nature</option>
            <option value="BRAINWAVE">Brainwave</option>
          </select>
          <button onClick={applyFilters} className={styles.button}>
            Apply Filters
          </button>
        </div>
      </div>
      <div className={styles.grid}>
        {sounds.map((sound) => (
          <div key={sound.id} className={styles.card}>
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{sound.title}</h2>
              <audio
                controls
                src={sound.fileUrl}
                className={styles.audioPlayer}
              >
                Your browser does not support the audio element.
              </audio>
              <p className={styles.cardInfo}>Author: {sound.author}</p>
              <p className={styles.cardInfo}>
                หมวดหมู่: {sound.Category?.name || "ไม่ระบุ"}
              </p>
              <p className={styles.cardInfo}>
                Duration: {sound.duration ? sound.duration.toFixed(2) : "N/A"}{" "}
                seconds
              </p>
              <p className={styles.cardInfo}>
                ผู้สร้าง: {sound.author || "ไม่ระบุ"}
              </p>

              <p className={styles.cardDate}>
                Created: {new Date(sound.createdAt).toLocaleString()}
              </p>
              <p className={styles.cardDate}>
                Updated: {new Date(sound.updatedAt).toLocaleString()}
              </p>
              <div className={styles.cardActions}>
                <Link
                  href={`/sounds/${sound.id}/edit`}
                  className={`${styles.button} ${styles.editButton}`}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(sound.id)}
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
  );
}
