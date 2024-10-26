"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaPlay, FaBook, FaWater, FaFish, FaShip } from "react-icons/fa";
import styles from "./rightbar.module.css";

const OceanIcon = ({
  icon: Icon,
  delay,
}: {
  icon: React.ComponentType;
  delay: number;
}) => (
  <motion.div
    className={styles.oceanIcon}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }} // แอนิเมชันเมื่อต้องการซ่อน
    transition={{ delay, duration: 0.5 }}
  >
    <Icon />
  </motion.div>
);

const Button = ({
  children,
  icon: Icon,
}: {
  children: React.ReactNode;
  icon: React.ComponentType;
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.button
      className={styles.button}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={isPressed ? { y: 2 } : { y: 0 }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      <motion.div className={styles.buttonContent}>
        <Icon />
        <span>{children}</span>
      </motion.div>
      <motion.div
        className={styles.buttonShadow}
        animate={isPressed ? { opacity: 0.4, y: 1 } : { opacity: 1, y: 4 }}
      />
    </motion.button>
  );
};

const Rightbar = () => {
    
  return (
    <AnimatePresence mode="wait">
      <div className={styles.container}>
        <motion.div
          className={styles.item}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }} // ใช้แอนิเมชันเมื่อ transition
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={styles.bgContainer}>
            <Image className={styles.bg} src="/ocean-bg.jpg" alt="" fill />
          </div>
          <div className={styles.text}>
            <motion.span
              className={styles.notification}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }} // ใช้ exit เมื่อมี transition
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              🌊 Dive In Now
            </motion.span>
            <motion.h3
              className={styles.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }} // ใช้ exit เมื่อมี transition
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Explore the depths of our new ocean dashboard!
            </motion.h3>
            <motion.span
              className={styles.subtitle}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }} // ใช้ exit เมื่อมี transition
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Swim through in just 4 minutes
            </motion.span>
            <motion.p
              className={styles.desc}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }} // ใช้ exit เมื่อมี transition
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Dive into a sea of features and discover the hidden treasures of
              our latest update. Navigate through crystal-clear interfaces and
              ride the wave of productivity!
            </motion.p>
            <Button icon={FaPlay}>Watch</Button>
          </div>
          <div className={styles.iconContainer}>
            <OceanIcon icon={FaWater} delay={0.6} />
            <OceanIcon icon={FaFish} delay={0.7} />
            <OceanIcon icon={FaShip} delay={0.8} />
          </div>
        </motion.div>

        <motion.div
          className={styles.item}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }} // ใช้ exit เมื่อมี transition
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className={styles.text}>
            <motion.span
              className={styles.notification}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }} // ใช้ exit เมื่อมี transition
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              🚢 Sailing Soon
            </motion.span>
            <motion.h3
              className={styles.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }} // ใช้ exit เมื่อมี transition
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              New features on the horizon: get ready to set sail!
            </motion.h3>
            <motion.span
              className={styles.subtitle}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }} // ใช้ exit เมื่อมี transition
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Chart your course to success
            </motion.span>
            <motion.p
              className={styles.desc}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }} // ใช้ exit เมื่อมี transition
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Prepare to embark on a journey of innovation! Our upcoming
              features will help you navigate the seas of data with ease and
              precision.
            </motion.p>
            <Button icon={FaBook}>Learn</Button>
          </div>
          <div className={styles.iconContainer}>
            <OceanIcon icon={FaWater} delay={0.8} />
            <OceanIcon icon={FaFish} delay={0.9} />
            <OceanIcon icon={FaShip} delay={1.0} />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Rightbar;
