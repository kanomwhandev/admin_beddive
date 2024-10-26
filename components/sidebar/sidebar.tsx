import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdHelpCenter,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
} from "react-icons/md";
import MenuLink from "./menuLink/menuLink";

const menuItems = [
  {
    title: "2D-content",
    list: [
      {
        title: "Dashboard",
        path: "/admin_dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Sounds",
        path: "/sounds",
        icon: <MdShoppingBag />,
      },
      {
        title: "Music",
        path: "/music_playlist",
        icon: <MdAttachMoney />,
      },
      {
        title: "Mixes",
        path: "/mixes",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "3D-content",
    list: [
      {
        title: "Storykids",
        path: "/storykids",
        icon: <MdWork />,
      },
      {
        title: "Breathe",
        path: "/breathe",
        icon: <MdPeople />,
      },
      {
        title: "Blog",
        path: "/blog",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "Users",
    list: [
      {
        title: "Settings",
        path: "/users/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/users/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];
const Sidebar = () => {
  return (
    <div className={styles.container}>
      {/* Profile_Details */}
      <div className={styles.userImage}>
        <img src="/noavartar.png" alt="" width="50" height="50" />
        <div className={styles.userDetails}>
          <span className={styles.username}>John Doe</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
