import { useState } from 'react';
import styles from './MovieList.module.css';

export default function MovieList({ movies }) {
  const [search, setSearch] = useState('');

  const filteredMovies = movies?.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.movieListContainer}>
      <div className={styles.movieListHeader}>
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button className={styles.addButton}>Add Movie</button>
      </div>
      <table className={styles.movieTable}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Release Date</th>
            <th>Genre</th>
            <th>Runtime</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMovies?.map(movie => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{new Date(movie.releaseDate).toLocaleDateString()}</td>
              <td>{movie.genre.join(', ')}</td>
              <td>{movie.runtime} min</td>
              <td>{movie.status}</td>
              <td>
                <button className={styles.editButton}>Edit</button>
                <button className={styles.deleteButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}