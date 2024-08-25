import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: ['Food', 'Rent', 'Entertainment', 'Travel'],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
  },
});

export const { addCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
