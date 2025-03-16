import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Movie {
  Poster: string;
  Type: string;
  imdbID: string;
  Year: string;
  Title: string;
}
interface DataState {
  movies: Movie[];
  searchResult:string;
  searchKey:string
}

const initialState: DataState = {
  movies: [],
  searchResult:'',
  searchKey:'',
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
  }
});

export const { setMovies,setSearchResult,setSearchKey } = dataSlice.actions;
export default dataSlice.reducer;
