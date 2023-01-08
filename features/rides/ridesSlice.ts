import { createSlice } from '@reduxjs/toolkit';

export interface ridesTypes {
  image_url: string[];
  price: string[];
  editPrice: string[];
}

const initialStateValue: ridesTypes = {
  image_url: [],
  price: [],
  editPrice: [],
};

export const ridesSlice = createSlice({
  name: 'rides',
  initialState: initialStateValue,
  reducers: {
    addPrice: (state, action) => {
      state.price.push(action.payload);
    },
    removePrice: (state, action) => {
      state.price.splice(
        state.price.findIndex((data) => data === action.payload),
        1
      );
    },

    editPrice: (state, action) => {
      if (action.payload instanceof Array) {
        state.editPrice = action.payload;
      } else {
        state.editPrice.push(action.payload);
      }
    },
    removeEditPrice: (state, action) => {
      state.editPrice.splice(
        state.editPrice.findIndex((data) => data === action.payload),
        1
      );
    },

    handleImages: (state, action) => {
      if (action.payload instanceof Array) {
        state.image_url = action.payload;
      } else {
        state.image_url.push(action.payload);
      }
    },
    removeImages: (state, action) => {
      state.image_url.splice(action.payload, 1);
    },
  },
});

export default ridesSlice.reducer;

export const {
  addPrice,
  removePrice,
  handleImages,
  removeImages,
  editPrice,
  removeEditPrice,
} = ridesSlice.actions;
