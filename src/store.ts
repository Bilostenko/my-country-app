import { configureStore } from '@reduxjs/toolkit';
import toggleTheme from './redux/appSlice';
import searchReducer from './redux/searchSlice';

const store = configureStore({
  reducer: {
    app: toggleTheme,
    search: searchReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
