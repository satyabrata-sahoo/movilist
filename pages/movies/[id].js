import MovieDetails from '../../components/Client/MovieDetails';

export default function MoviePage({ movie }) {
  return <MovieDetails movie={movie} />;
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  // Simulate fetching movie data (replace with your API call)
  const movieData = {
    title: "Baahubali: The Beginning",
    description: "In the kingdom of Mahishmati, Shivudu grows up to become a strong and courageous young man. He sets out on a journey to discover his true identity and fulfill his destiny.",
    tagline: "Why did Kattappa kill Baahubali?",
    releaseDate: "2015-07-10T00:00:00.000Z",
    runtime: 159,
    genre: ["Action", "Adventure", "Drama"],
    language: "Telugu",
    certification: "U/A",
    director: ["S.S. Rajamouli"],
    writers: ["S.S. Rajamouli", "Vijayendra Prasad"],
    cast: [
      { name: "Prabhas", role: "Shivudu / Mahendra Baahubali", _id: "67dff3bc53e89368c2023c81" },
      { name: "Rana Daggubati", role: "Bhallaladeva", _id: "67dff3bc53e89368c2023c82" },
      { name: "Anushka Shetty", role: "Devasena", _id: "67dff3bc53e89368c2023c83" },
      { name: "Tamannaah", role: "Avanthika", _id: "67dff3bc53e89368c2023c84" },
      { name: "Ramya Krishnan", role: "Sivagami", _id: "67dff3bc53e89368c2023c85" },
    ],
    budget: 120000000,
    productionCompanies: ["Arka Media Works"],
    status: "Active",
    _id: "67dff3bc53e89368c2023c80",
    poster: "https://res.cloudinary.com/dmbgykgpg/image/upload/v1742730174/lfdnge9ovsds6qdqra6x.jpg",
  };

  // Replace with actual API fetch
  // const res = await fetch(`http://your-api-endpoint/movies/${id}`);
  // const movieData = await res.json();
//   const movie = movieData._id === id ? movieData : null;
const movie = movieData
  return {
    props: {
      movie,
    },
  };
}