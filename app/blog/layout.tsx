import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import styles from "./blog.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <Navbar />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
