import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false)
  // going to fetch the movies instead of using the dummy-data
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];
  async function fetchMoviesHandler() {
    setLoading(true);
    const response = await fetch('https://swapi.dev/api/films/')
      .catch((error) => {
        console.log("%c GET fetch error: ", "color: red;", error);
      })
    console.log('%c response: ', 'color: green;', response);
    const data = await response.json();
    const transformedMovies = data.results.map((movie) => {
      return {
        id: movie.episode_id,
        title: movie.title,
        releaseDate: movie.release_date,
        openingText: movie.opening_crawl
      };
    }); 
    setMovies(transformedMovies);   
    setLoading(false);   
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <p>Loading movies...</p>}
        {(!isLoading && movies.length === 0) && <p>Isn't Star Wars dumb!</p>}
        {(!isLoading &&  movies.length > 0) && <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
