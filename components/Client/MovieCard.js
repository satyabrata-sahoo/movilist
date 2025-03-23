import { useRouter } from 'next/router';
import styles from './MovieCard.module.css';

export default function MovieCard({ movie }) {
  const router = useRouter();

  const handleMoreInfo = () => {
    router.push(`/movies/${movie._id}`);
  };

  return (
    <div className={styles.movieCard}>
      <img src={movie.poster} alt={movie.title} />
      <div className={styles.movieCardOverlay} />
      <div className={styles.movieCardContent}>
        <h3>{movie.title}</h3>
        <p>{movie.genre.join(', ')}</p>
        <button className={styles.infoButton} onClick={handleMoreInfo}>
          More Info
        </button>
      </div>
    </div>
  );
}