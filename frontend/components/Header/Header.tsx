import { useContext } from 'react';
import { AppContext } from '../../contexts/appContext';
import Link from 'next/link';
import styles from './Header.module.css';

const PAGES_MAP = [
  {
    label: 'Auth',
    link: '/',
  },
  {
    label: 'No auth',
    link: '/no-auth',
  },
];

export function Header() {
  const {
    signIn,
    signOut,
    appState: { isAuthenticated, userName },
  } = useContext(AppContext);

  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          <ul className={styles.ul}>
            {PAGES_MAP.map((page) => (
              <li className={styles.li}>
                <Link href={page.link}>
                  <a href='#'>{page.label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          {!isAuthenticated ? (
            <button onClick={() => signIn()}>Sign in</button>
          ) : (
            <div className={styles.authCtn}>
              <button onClick={() => signOut()}>Sign out</button>
              <span className={styles.userName}>{userName}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
