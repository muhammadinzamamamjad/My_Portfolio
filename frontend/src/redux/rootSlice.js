import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
  name: 'root',
  initialState: {
    isLoading: false,
    PortfolioData: null
  },
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    HideLoading: (state) => {
      state.isLoading = false; 
    },
    setPortfolioData: (state, action) => {
      state.PortfolioData = action.payload;
    },
  },
});

export default rootSlice.reducer;
export const { showLoading, HideLoading, setPortfolioData } = rootSlice.actions;