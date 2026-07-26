import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { characters as charactersData } from '../../data/characters';

export const fetchCharacters = createAsyncThunk('characters/fetchCharacters', async () => {
  await new Promise((resolve) => setTimeout(resolve, 450));
  return charactersData;
});

const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load characters.';
      });
  },
});

export default charactersSlice.reducer;
