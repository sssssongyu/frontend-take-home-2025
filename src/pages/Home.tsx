import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
interface Movie {
  Poster: string;
  Type: string;
  imdbID: string;
  Year: string;
  Title: string;
}

function Home() {
  const navigate = useNavigate();

  const movies: Movie[] = useSelector((state: RootState) => state.data.movies);
  const searchResult: string = useSelector((state: RootState) => state.data.searchResult);
  const searchKey: string = useSelector((state: RootState) => state.data.searchKey);

  const goMovie = (id: string) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="mx-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.length !== 0 ? (
          movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="cursor-pointer bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
              onClick={()=>goMovie(movie.imdbID)}
            >
              <a href="#">
                <img className="rounded-t-lg w-full" src={movie.Poster!=='N/A'?movie.Poster:'/noposter.jpeg'} alt={movie.Title} />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.Title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{movie.Year}</p>
              </div>
            </div>
          ))
        ) : (
          <div>{searchKey==''?'Please search movies':`Warning: ${searchResult}`}</div>
        )}
      </div>
    </div>

  );
}

export default Home;
