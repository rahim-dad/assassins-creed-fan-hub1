import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'ac-hub-favorites';

const loadFavorites = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const persist = (ids) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // localStorage unavailable (private browsing, quota, etc.) - fail silently
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    ids: loadFavorites(),
  },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload);
        persist(state.ids);
      }
    },
    removeFavorite: (state, action) => {
      state.ids = state.ids.filter((id) => id !== action.payload);
      persist(state.ids);
    },
    toggleFavorite: (state, action) => {
      if (state.ids.includes(action.payload)) {
        state.ids = state.ids.filter((id) => id !== action.payload);
      } else {
        state.ids.push(action.payload);
      }
      persist(state.ids);
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
