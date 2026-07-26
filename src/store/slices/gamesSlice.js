import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { games as gamesData } from '../../data/games';

// Simulates an API call (axios-style) resolving local data with a short
// network-like delay, so the UI can exercise real loading/error states.
export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return gamesData;
});

const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    items: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load games.';
      });
  },
});

export default gamesSlice.reducer;
