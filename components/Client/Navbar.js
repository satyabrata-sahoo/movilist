import { useRouter } from 'next/router';
import styles from './MovieCard.module.css'; // Use its own CSS module


export default function Navbar() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Movie App</div>
      <ul className={styles.navLinks}>
        <li>
          <button
            className={router.pathname === '/' ? styles.active : styles.navButton}
            onClick={() => handleNavigation('/')}
          >
            Home
          </button>
        </li>
        <li>
          <button
            className={router.pathname === '/Login' ? styles.active : styles.navButton}
            onClick={() => handleNavigation('/Login')}
          >
            Login
          </button>
        </li>
        {/* <li>
          <button
            className={router.pathname === '/account' ? styles.active : styles.navButton}
            onClick={() => handleNavigation('/account')}
          >
            Account
          </button>
        </li> */}
      </ul>
    </nav>
  );
}