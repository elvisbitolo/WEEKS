import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { DataState } from '../types/types';
import { fetchDataFromApi } from '../api/api';

const initialState: DataState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunk targeting runtime endpoints dynamically
export const fetchGenericData = createAsyncThunk(
  'data/fetchGenericData',
  async (url: string, thunkAPI) => {
    try {
      return await fetchDataFromApi<any[]>(url);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch data');
    }
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    clearData: (state) => {
      state.items = [];
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenericData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenericData.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchGenericData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearData } = dataSlice.actions;
export default dataSlice.reducer;