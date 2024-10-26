"use client"; // เพิ่มบรรทัดนี้ที่ด้านบน

import React from "react";
import { Howl } from "howler";
import Head from "next/head";

const sounds = [
  {
    name: "Campfire",
    sound: "public/sounds/campfire.mp3",
    icon: "public/icons/sea.png",
  },
];

const Demo: React.FC = () => {
  const playSound = (sound: string) => {
    const howl = new Howl({
      src: [sound],
      volume: 1.0,
    });
    howl.play();
  };

  return (
    <div style={styles.container}>
      <Head>
        <title>Soundboard Demo</title>
      </Head>
      <h1 style={styles.header}>Soundboard Demo</h1>
      <div style={styles.soundGrid}>
        {sounds.map((sound, index) => (
          <button
            key={index}
            style={styles.soundCard}
            onClick={() => playSound(sound.sound)}
          >
            <img src={sound.icon} alt={sound.name} style={styles.icon} />
            <p style={styles.text}>{sound.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center" as const,
    padding: "20px",
    backgroundColor: "#1a1a2e",
    color: "#fff",
    minHeight: "100vh",
  },
  header: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  soundGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
  },
  soundCard: {
    backgroundColor: "#16213e",
    padding: "20px",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "transform 0.2s",
    textAlign: "center" as const,
  },
  soundCardHover: {
    transform: "scale(1.05)",
  },
  icon: {
    width: "80px",
    height: "80px",
    marginBottom: "10px",
  },
  text: {
    color: "#fff",
  },
};

export default Demo;
