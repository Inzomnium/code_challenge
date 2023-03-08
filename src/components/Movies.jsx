import { useState, useEffect, useRef } from 'react';
import Movie from './Movie';
import '../styles/movies.scss';

const Movies = ({ movies, viewTrailer, closeCard, fetchMoreMovies, searchQuery }) => {
  const [loadedMovies, setLoadedMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const loadMoreButtonRef = useRef(null);

  useEffect(() => {
    if (movies.movies.results) {
      setLoadedMovies(prevMovies => [...prevMovies, ...movies.movies.results]);
    }
  }, [movies]);

  useEffect(() => {
    const filteredMovies = loadedMovies.filter(movie => movie.title.toLowerCase().includes(searchQuery));
    setSearchMovies(filteredMovies);
  }, [loadedMovies, searchQuery]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchMoreMovies();
      }
    }, options);

    if (loadMoreButtonRef.current) {
      observer.observe(loadMoreButtonRef.current);
    }

    return () => {
      if (loadMoreButtonRef.current) {
        observer.unobserve(loadMoreButtonRef.current);
      }
    };
  }, [fetchMoreMovies]);

  const moviesToRender = searchQuery ? searchMovies : loadedMovies;

  return (
    <div className='movies' data-testid="movies">
      {Array.isArray(moviesToRender) ? (
        moviesToRender.map((movie, index) => (
          <Movie
            movie={movie}
            key={index}
            viewTrailer={viewTrailer}
            closeCard={closeCard}
          />
        ))
      ) : (
        <p>No movies to display</p>
      )}
      {movies.movies.total_pages > movies.movies.page && (
        <button ref={loadMoreButtonRef} onClick={fetchMoreMovies}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Movies;
