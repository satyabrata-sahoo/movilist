import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Login.module.css';


export default function Login() {
  const router = useRouter();
  const [loginType, setLoginType] = useState('customer'); // 'customer' or 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    console.log('Admin login:', { email, password });
    router.push('/admin/movies'); // Redirect to admin page
  };

  return (
    <>
      <div className={styles.container}>
        <h1>Login</h1>
        <div className={styles.tabs}>
        </div>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={styles.input}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </>
  );
}