// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './data';  

const store = configureStore({
  reducer: {
    data: dataReducer 
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
