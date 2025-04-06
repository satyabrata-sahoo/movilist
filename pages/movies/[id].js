import MovieDetails from '../../components/Client/MovieDetails';

// Utility function to fetch movie with better error details
const fetchMovie = async (id) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/movie/movie-list?movie_id=${id}`;
  try {
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
    }

    return res.json();
  } catch (error) {
    throw error; // Re-throw for handling in getServerSideProps
  }
};

export default function MoviePage({ movie, error }) {
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-bold">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Movie not found</div>
      </div>
    );
  }

  return <MovieDetails movie={movie} />;
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  console.log("id==============", id);

  try {
    const movieData = await fetchMovie(id);
    
    let movie = null;
    if (movieData?.data?.pageResult) {
      if (Array.isArray(movieData.data.pageResult)) {
        movie = movieData.data.pageResult.find(m => m?._id === id) || null;
      } else {
        console.warn('pageResult is not an array:', movieData.data.pageResult);
      }
    } else if (movieData?._id === id) {
      movie = movieData;
    } else {
      console.log('Unexpected response structure:', movieData);
    }

    if (!movie) {
      console.log(`Movie with id ${id} not found in response`);
    }

    return {
      props: {
        movie,
        error: null,
      },
    };
  } catch (error) {
    console.error(`Error fetching movie ${id}:`, error.message);
    return {
      props: {
        movie: null,
        error: `Failed to load movie: ${error.message}`,
      },
    };
  }
}