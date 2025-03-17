import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Movie {
  Poster: string;
  Type: string;
  imdbID: string;
  Year: string;
  Title: string;
}

interface MovieListContent {
  imdbID: string;
  Title: string;
}

interface MovieList {
  [key: string]: MovieListContent;
}
interface DataState {
  movies: Movie[];
  searchResult:string;
  searchKey:string
  watchList:MovieList;
}

const initialState: DataState = {
  movies: [],
  searchResult:'',
  searchKey:'',
  watchList:JSON.parse(localStorage.getItem('watchList') || '{}'),
};



const dataSlice = createSlice({
  name: 'data', 
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload; 
    },
    setSearchResult: (state, action: PayloadAction<string>) => {
      state.searchResult = action.payload;
    },
    setSearchKey: (state, action: PayloadAction<string>) => {
      state.searchKey = action.payload;
    },
    addToWatchList(state, action: PayloadAction<Partial<Movie>>) {
      const movie = action.payload;
      if (movie.imdbID) {
        state.watchList[movie.imdbID] = {
          ...state.watchList[movie.imdbID],
          ...movie,
        };
      }
      localStorage.setItem('watchList', JSON.stringify(state.watchList));
    },
    removeFromWatchList(state, action: PayloadAction<string>) {
      console.log('action.payload',action.payload)
      const imdbID = action.payload;
      delete state.watchList[imdbID];
      localStorage.setItem('watchList', JSON.stringify(state.watchList));
    },
  }
});

export const { setMovies,setSearchResult,setSearchKey,addToWatchList,removeFromWatchList } = dataSlice.actions;
export default dataSlice.reducer;
