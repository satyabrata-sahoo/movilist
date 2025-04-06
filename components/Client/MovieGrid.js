import { useRouter } from 'next/router';
import MovieCard from './MovieCard';
import styles from './MovieCard.module.css';
import Navbar from './Navbar';

export default function MovieGrid({ movies }) {
  console.log("movies=====",movies)
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  const moviesByIndustry = movies?.reduce((acc, movie) => {
    const industry = movie.industry || 'Unknown';
    acc[industry] = acc[industry] || [];
    acc[industry].push(movie);
    return acc;
  }, {}) || {};
console.log("moviesByIndustry",moviesByIndustry)
  const featuredMovie = movies?.[0] || {};

  return (
    <div>
      {/* Navbar */}
      {/* <nav className={styles.navbar}>
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
              className={router.pathname === '/login' ? styles.active : styles.navButton}
              onClick={() => handleNavigation('/login')}
            >
              Login
            </button>
          </li>
          <li>
            <button
              className={router.pathname === '/account' ? styles.active : styles.navButton}
              onClick={() => handleNavigation('/account')}
            >
              Account
            </button>
          </li>
        </ul>
      </nav> */}
      <Navbar/>

      {/* Banner Section */}
      <div className={styles.banner}>
        <img src="https://res.cloudinary.com/dmbgykgpg/image/upload/v1742754500/fts5bvilgdhecbpb4bto.jpg" alt={featuredMovie.title} className={styles.bannerImage} />
        <div className={styles.bannerContent}>
          <h1>{featuredMovie.title}</h1>
          <p>{featuredMovie.description}</p>
          <button className={styles.watchButton}>Watch Now</button>
        </div>
      </div>

      {/* Industry-Wise Movies */}
      <div className={styles.movieGridContainer}>
        <h2 className={styles.movieGridTitle}>Explore Movies</h2>
        {['Bollywood', 'Hollywood', 'Tollywood'].map(industry => (
          moviesByIndustry[industry] && (
            <div key={industry} className={styles.industrySection}>
              <h3 className={styles.industryTitle}>{industry}</h3>
              <div className={styles.movieGrid}>
                {moviesByIndustry[industry].map(movie => (
                  <MovieCard key={movie._id} movie={movie} />
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}