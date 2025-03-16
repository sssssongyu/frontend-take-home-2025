import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  count: number;
}

const initialState: DataState = {
  count: 0,
};

const dataSlice = createSlice({
  name: 'data', 
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    }
  }
});

export const { increment, decrement, reset, setCount } = dataSlice.actions;
export default dataSlice.reducer;
