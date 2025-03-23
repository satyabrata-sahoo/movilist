import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Login.module.css';
import Navbar from './Navbar';

export default function Login() {
  const router = useRouter();
  const [loginType, setLoginType] = useState('customer'); // 'customer' or 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (loginType === 'customer') {
      if (!email) {
        setError('Email is required');
        return;
      }
      console.log('Customer login:', { email });
      router.push('/'); // Redirect to home after login
    } else {
      if (!email || !password) {
        setError('Email and password are required');
        return;
      }
      console.log('Admin login:', { email, password });
      router.push('/admin/movies'); // Redirect to admin page
    }
  };

  return (
    <>
    <Navbar/>
    <div className={styles.container}>
      <h1>Login</h1>
      <div className={styles.tabs}>
        <button
          className={loginType === 'customer' ? styles.activeTab : styles.tab}
          onClick={() => setLoginType('customer')}
        >
          Customer Login
        </button>
        <button
          className={loginType === 'admin' ? styles.activeTab : styles.tab}
          onClick={() => setLoginType('admin')}
        >
          Admin Login
        </button>
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

        {loginType === 'admin' && (
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
        )}
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.loginButton}>
          {loginType === 'customer' ? 'Login as Customer' : 'Login as Admin'}
        </button>
      </form>
    </div>
    </>
  );
}