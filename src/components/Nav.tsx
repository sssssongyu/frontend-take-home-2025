import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMovies,setSearchResult,setSearchKey } from '../redux/data';
import { useNavigate } from 'react-router-dom';

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [watchListOpen, setWatchListOpen] = useState(false);
  const [searchkey, setSeaarch] = useState('');
  const [page, setPage] = useState(1);

  const toggleWatchList = () => {
    setWatchListOpen(!watchListOpen);
  };

  const getMovies = async () => {
    const response = await fetch(`https://www.omdbapi.com/?s=${searchkey}&page=${page}&apikey=320f6ab2`);
    const data = await response.json();
    if(data.Response	==='True'){
      dispatch(setMovies(data.Search || []))
    }else{
      dispatch(setSearchResult(data.Error	 || ''))
      dispatch(setMovies([]))
    }
  };
  
  useEffect(() => {
    getMovies();
  }, [searchkey]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeaarch(event.target.value); 
    dispatch(setSearchKey(event.target.value))
    navigate('/');
  };

  return (
    <nav className="fixed top-0 p-2 dark:bg-black w-full flex justify-between">
      <div className="font-bold text-3xl">Getfilx</div>

      <form className="flex items-center max-w-sm mx-auto">
        <label className="sr-only">Search</label>
        <div className="">
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-white focus:ring-0 focus:outline-none"
            placeholder="Search Movie Name..."
            required
            value={searchkey}
            onChange={handleSearchChange}
          />

        </div>

        <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium bg-primary-700 rounded-lg border border-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>

      <button onClick={toggleWatchList} className="p-2 text-sm cursor-pointer bg-black dark:bg-white text-white dark:text-black rounded-full">
        WatchList
      </button>


      {watchListOpen && (
        <div
          className="fixed inset-0 bg-gray-800 opacity-50 z-40"
          onClick={toggleWatchList}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 bg-gray-800 text-white w-64 h-full transform transition-all duration-300 z-50 ${watchListOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between p-4">
          <h2 className="text-lg">Menu</h2>
          <button onClick={toggleWatchList} className="text-white">
            &times;
          </button>
        </div>
        <ul className="space-y-4 p-4">
          123
        </ul>
      </div>
    </nav>
  );
}

export default Nav;