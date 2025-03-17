import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMovies, setSearchResult, setSearchKey, setEmptyMovies } from '../redux/data';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { debounce } from 'lodash';

interface Movie {
  Title: string;
  imdbID: string;
}

interface MovieList {
  [key: string]: Movie;
}

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const watchList: MovieList = useSelector((state: RootState) => state.data.watchList);
  const [watchListOpen, setWatchListOpen] = useState(false);
  const [searchkey, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [movieListArray, setMovieListArray] = useState<[string, Movie][]>([]);
  const [selectMovieType, setSelectMovieType] = useState(false);
  const [movieType, setMovieType] = useState('');
  const movieTypes: { [key: string]: string } = {
    '': 'All',
    movies: 'Movies',
    series: 'Series',
    episodes: 'Episodes',
  };

  const handleChangMovieType = (key: keyof typeof movieTypes) => {
    setMovieType(key);
    console.log('s', key)
  };

  const toggleMovieTypeSelection = () => {
    setSelectMovieType(!selectMovieType);
  };

  const toggleWatchList = () => {
    setWatchListOpen(!watchListOpen);
  };

  const getMovies = async () => {
    const response = await fetch(`https://www.omdbapi.com/?s=${searchkey}&page=${page}&apikey=320f6ab2&type=${movieType}`);
    const data = await response.json();
    if (data.Response === 'True') {
      dispatch(setMovies(data.Search || []));
    } else {
      dispatch(setSearchResult(data.Error || ''));
      if (page === 1) {
        dispatch(setEmptyMovies());
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setEmptyMovies());
    setPage(1);
    if (page == 1) {
      getMovies();
    } else {
      setPage(1);
    }
  }, [searchkey, movieType]);

  useEffect(() => {
    getMovies();
  }, [page]);


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    dispatch(setSearchKey(event.target.value));
    navigate('/');
  };

  useEffect(() => {
    setMovieListArray(Object.entries(watchList));
  }, [watchList]);

  const goHome = () => {
    navigate('/');
  }

  const goMovie = (id: string) => {
    navigate(`/movie/${id}`);
  };
  const handleScroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      setPage(prevPage => prevPage + 1);
    }
  }, 300);


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="bg-white dark:bg-black fixed top-0 p-2 dark:bg-black w-full flex justify-between flex-wrap gap-4">
      <div className="sm:w-auto font-bold text-3xl cursor-pointer" onClick={goHome}>Getfilx</div>

      <form className="w-full text-center sm:w-auto sm:order-none order-last flex items-center max-w-sm mx-auto">
        <label className="sr-only">Search</label>
        <div className="w-full">
          <input
            type="text"
            id="simple-search"
            className="w-full sm:w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-white focus:ring-0 focus:outline-none"
            placeholder="Search Movie Name..."
            required
            value={searchkey}
            onChange={handleSearchChange}
          />
        </div>

        {/* <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium bg-primary-700 rounded-lg border border-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          <span className="sr-only">Search</span>
        </button> */}

        <div className='relative'>
          <button onClick={toggleMovieTypeSelection} id="dropdownDefaultButton" className="w-auto ml-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">{movieTypes[movieType]} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
          </button>

          {selectMovieType && (
            <div id="dropdown" className="absolute top-10 z-10 divide-y divide-gray-100 rounded-lg shadow-sm w-30 dark:bg-gray-700 bg-white">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                {Object.keys(movieTypes).map((key) => (
                  <li key={key}>
                    <a
                      href="#"
                      className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleChangMovieType(key as keyof typeof movieTypes)}
                    >
                      {movieTypes[key as keyof typeof movieTypes]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </form>

      <button onClick={toggleWatchList} className=" sm:w-auto p-2 text-sm cursor-pointer bg-black dark:bg-white text-white dark:text-black rounded-full">
        WatchList
      </button>

      {watchListOpen && (
        <div className="fixed inset-0 bg-gray-800 opacity-50 z-40" onClick={toggleWatchList}></div>
      )}
      <div className={`fixed top-0 right-0 bg-gray-800 text-white sm:w-64 h-full transform transition-all duration-300 z-50 ${watchListOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-4">
          <h3 className="text-xl font-bold flex justify-between">
            <div>WatchList</div>
            <div className="cursor-pointer" onClick={toggleWatchList}>X</div>
          </h3>
          {movieListArray.length > 0 ? (
            movieListArray.map(([key, movie]) => (
              <div key={key}>
                <h4 className='my-2 cursor-pointer' onClick={() => goMovie(key)}>{movie.Title}</h4>
              </div>
            ))
          ) : (
            <p className='my-2'>No movies in your watchlist</p>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
