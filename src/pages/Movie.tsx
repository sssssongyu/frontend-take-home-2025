import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useParams } from 'react-router-dom';

interface MovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
}

function Movie() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);

  const getMovies = async () => {
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=320f6ab2`);
    const data = await response.json();
    setMovie(data)
  };

  useEffect(()=>{
    getMovies()
  },[])

  return (
    <div className="mx-8 md:flex">
      <img src={movie?.Poster} className="w-full sm:w-[50vw]" alt={movie?.Title}/>
      <div className='md:px-4'>
        <div className='text-3xl font-bold'>{movie?.Title}</div>
        <div className='text-sm text-gray-500'>{movie?.Year}</div>
        <div>{movie?.Rated}</div>
        <div>{movie?.Country}</div>
        <div>{movie?.Language}</div>
        <br/>
        <div><span className='font-bold mr-1'>Director:</span>{movie?.Director}</div>
        <div><span className='font-bold mr-1'>Writer:</span>{movie?.Writer}</div>
        <br/>
        <div><span className='font-bold mr-1'>Actors:</span>{movie?.Actors}</div>
        <div><span className='font-bold mr-1'>Plot:</span>{movie?.Plot}</div>
      </div>
    </div>

  );
}

export default Movie;
