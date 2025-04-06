import { useState } from 'react';
import styles from './MovieDetails.module.css';
import Navbar from './Navbar';
export default function MovieDetails({ movie }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([
    { id: 1, user: 'User1', text: 'Great movie!', likes: 5, liked: false, date: '2025-03-22' },
    { id: 2, user: 'User2', text: 'Epic storyline.', likes: 3, liked: false, date: '2025-03-21' },
  ]); // Simulated reviews
  const [sortBy, setSortBy] = useState('recent'); // 'recent' or 'popular'
  const [currentPage, setCurrentPage] = useState(1);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editText, setEditText] = useState('');
  const reviewsPerPage = 2; // Pagination limit

  // Simulated logged-in user
  const currentUser = 'User1';

  const handleRating = (value) => setRating(value);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (review.trim()) {
      const newReview = {
        id: Date.now(), // Unique ID for simplicity
        user: currentUser,
        text: review,
        likes: 0,
        liked: false,
        date: new Date().toISOString().split('T')[0],
      };
      setReviews([newReview, ...reviews]);
      setReview('');
      setRating(0);
    }
  };

  const handleLike = (reviewId) => {
    setReviews(reviews.map(r =>
      r.id === reviewId ? { ...r, likes: r.liked ? r.likes - 1 : r.likes + 1, liked: !r.liked } : r
    ));
  };

  const handleEdit = (review) => {
    setEditingReviewId(review.id);
    setEditText(review.text);
  };

  const handleSaveEdit = (reviewId) => {
    setReviews(reviews.map(r =>
      r.id === reviewId ? { ...r, text: editText } : r
    ));
    setEditingReviewId(null);
    setEditText('');
  };

  const handleDelete = (reviewId) => {
    setReviews(reviews.filter(r => r.id !== reviewId));
  };

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'popular') return b.likes - a.likes;
    return new Date(b.date) - new Date(a.date); // Most recent
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const paginatedReviews = sortedReviews.slice(startIndex, startIndex + reviewsPerPage);

  if (!movie) {
    return <div className={styles.container}>Movie not found</div>;
  }

  return (
    <>
     <Navbar/>
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={movie.poster} alt={movie.title} className={styles.poster} />
        <div className={styles.headerContent}>
          <h1>{movie.title}</h1>
          <p className={styles.tagline}>{movie.tagline}</p>
          <p>{movie.description}</p>
          <div className={styles.details}>
            <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}</p>
            <p><strong>Runtime:</strong> {movie.runtime} min</p>
            {/* <p><strong>Genre:</strong> {movie.genre.join(', ')}</p> */}
            <p><strong>Language:</strong> {movie.language}</p>
            <p><strong>Certification:</strong> {movie.certification}</p>
            <p><strong>Director:</strong> {movie.director.join(', ')}</p>
            <p><strong>Writers:</strong> {movie.writers.join(', ')}</p>
            <p><strong>Budget:</strong> ${movie.budget.toLocaleString()}</p>
            <p><strong>Production:</strong> {movie.productionCompanies.join(', ')}</p>
          </div>
        </div>
      </div>

      <div className={styles.castSection}>
        <h2>Cast</h2>
        <ul className={styles.castList}>
          {movie.cast.map(actor => (
            <li key={actor._id} className={styles.castItem}>
              <strong>{actor.name}</strong> as {actor.role}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.reviewSection}>
        <h2>Rate & Review</h2>
        <div className={styles.rating}>
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              className={star <= rating ? styles.starFilled : styles.starEmpty}
              onClick={() => handleRating(star)}
            >
              ★
            </span>
          ))}
          <span className={styles.ratingText}>{rating}/5</span>
        </div>
        <form onSubmit={handleReviewSubmit} className={styles.reviewForm}>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review..."
            className={styles.reviewInput}
          />
          <button type="submit" className={styles.submitButton}>Submit Review</button>
        </form>

        <div className={styles.reviewControls}>
          <label>Sort by: </label>
          <select
            value={sortBy}
            onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
            className={styles.sortSelect}
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>

        <div className={styles.reviewsList}>
          {paginatedReviews.map(r => (
            <div key={r.id} className={styles.reviewItem}>
              {editingReviewId === r.id ? (
                <div>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className={styles.reviewInput}
                  />
                  <button
                    onClick={() => handleSaveEdit(r.id)}
                    className={styles.saveButton}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingReviewId(null)}
                    className={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <p><strong>{r.user}</strong> - {r.text}</p>
                  <div className={styles.reviewActions}>
                    <button
                      onClick={() => handleLike(r.id)}
                      className={r.liked ? styles.likedButton : styles.likeButton}
                    >
                      {r.liked ? 'Unlike' : 'Like'} ({r.likes})
                    </button>
                    {r.user === currentUser && (
                      <>
                        <button
                          onClick={() => handleEdit(r)}
                          className={styles.editButton}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(r.id)}
                          className={styles.deleteButton}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                  <p className={styles.reviewDate}>{r.date}</p>
                </>
              )}
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={styles.pageButton}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={styles.pageButton}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
}