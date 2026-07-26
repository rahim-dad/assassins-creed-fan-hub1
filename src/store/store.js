import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './slices/gamesSlice';
import charactersReducer from './slices/charactersSlice';
import favoritesReducer from './slices/favoritesSlice';
import searchReducer from './slices/searchSlice';
import filtersReducer from './slices/filtersSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    characters: charactersReducer,
    favorites: favoritesReducer,
    search: searchReducer,
    filters: filtersReducer,
    theme: themeReducer,
  },
});
