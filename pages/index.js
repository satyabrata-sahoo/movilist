import MovieList from "@/components/Admin/MovieList";
import MovieGrid from "@/components/Client/MovieGrid";

const movies = [
  {
    _id: "67dfdf9f9179a37015b8b9e2",
    title: "Lagaan",
    description: "In 1893, Indian villagers challenge their British rulers to a game of cricket to avoid paying oppressive taxes.",
    genre: ["Drama", "Sport", "Musical"],
    poster: "https://res.cloudinary.com/dmbgykgpg/image/upload/v1742725024/wggzuwp2tc4fys6ck9vu.jpg",
    industry: "Bollywood",
  },
  {
    _id: "67dfdf9f9179a37015b8b9e2",
    title: "Lagaan",
    description: "In 1893, Indian villagers challenge their British rulers to a game of cricket to avoid paying oppressive taxes.",
    genre: ["Drama", "Sport", "Musical"],
    poster: "https://res.cloudinary.com/dmbgykgpg/image/upload/v1742725024/wggzuwp2tc4fys6ck9vu.jpg",
    industry: "Bollywood",
  },
  {
    _id: "67dfdf9f9179a37015b8b9e2",
    title: "Lagaan",
    description: "In 1893, Indian villagers challenge their British rulers to a game of cricket to avoid paying oppressive taxes.",
    genre: ["Drama", "Sport", "Musical"],
    poster: "https://res.cloudinary.com/dmbgykgpg/image/upload/v1742725024/wggzuwp2tc4fys6ck9vu.jpg",
    industry: "Bollywood",
  },
  {
    _id: "67dfdf9f9179a37015b8b9e2",
    title: "Lagaan",
    description: "In 1893, Indian villagers challenge their British rulers to a game of cricket to avoid paying oppressive taxes.",
    genre: ["Drama", "Sport", "Musical"],
    poster: "https://res.cloudinary.com/dmbgykgpg/image/upload/v1742725024/wggzuwp2tc4fys6ck9vu.jpg",
    industry: "Bollywood",
  },
  {
    _id: "67dfdf9f9179a37015b8b9e3",
    title: "Inception",
    description: "Earth's mightiest heroes must come together to stop an alien invasion.",
    genre: ["Action", "Sci-Fi"],
    poster: "https://res.cloudinary.com/dmbgykgpg/image/upload/v1742729772/hdk1oinp13zbb0apnaag.jpg",
    industry: "Hollywood",
  },
  {
    _id: "67dfdf9f9179a37015b8b9e3",
    title: "Inception",
    description: "Earth's mightiest heroes must come together to stop an alien invasion.",
    genre: ["Action", "Sci-Fi"],
    poster: "https://res.cloudinary.com/dmbgykgpg/image/upload/v1742729772/hdk1oinp13zbb0apnaag.jpg",
    industry: "Hollywood",
  },
  {
    _id: "67dfdf9f9179a37015b8b9e3",
    title: "Inception",
    description: "Earth's mightiest heroes must come together to stop an alien invasion.",
    genre: ["Action", "Sci-Fi"],
    poster: "https://res.cloudinary.com/dmbgykgpg/image/upload/v1742729772/hdk1oinp13zbb0apnaag.jpg",
    industry: "Hollywood",
  },
  {
    _id: "67dfdf9f9179a37015b8b9e3",
    title: "Inception",
    description: "Earth's mightiest heroes must come together to stop an alien invasion.",
    genre: ["Action", "Sci-Fi"],
    poster: "https://res.cloudinary.com/dmbgykgpg/image/upload/v1742729772/hdk1oinp13zbb0apnaag.jpg",
    industry: "Hollywood",
  },
  {
    _id: "67dfdf9f9179a37015b8b9e4",
    title: "Baahubali",
    description: "A prince rises to reclaim his kingdom.",
    genre: ["Action", "Drama"],
    poster: "https://res.cloudinary.com/dmbgykgpg/image/upload/v1742730174/lfdnge9ovsds6qdqra6x.jpg",
    industry: "Tollywood",
  },
  {
    _id: "67dfdf9f9179a37015b8b9e4",
    title: "Baahubali",
    description: "A prince rises to reclaim his kingdom.",
    genre: ["Action", "Drama"],
    poster: "https://res.cloudinary.com/dmbgykgpg/image/upload/v1742730174/lfdnge9ovsds6qdqra6x.jpg",
    industry: "Tollywood",
  },
  {
    _id: "67dfdf9f9179a37015b8b9e4",
    title: "Baahubali",
    description: "A prince rises to reclaim his kingdom.",
    genre: ["Action", "Drama"],
    poster: "https://res.cloudinary.com/dmbgykgpg/image/upload/v1742730174/lfdnge9ovsds6qdqra6x.jpg",
    industry: "Tollywood",
  },
  {
    _id: "67dfdf9f9179a37015b8b9e4",
    title: "Baahubali",
    description: "A prince rises to reclaim his kingdom.",
    genre: ["Action", "Drama"],
    poster: "https://res.cloudinary.com/dmbgykgpg/image/upload/v1742730174/lfdnge9ovsds6qdqra6x.jpg",
    industry: "Tollywood",
  },
];

export default function Home() {
  return (
    <>
    {/* <Navbar /> */}
   <MovieGrid movies={movies} />

   {/* <MovieList/> */}
    {/* <h1>Movies List......</h1> */}
    </>
  );
}
