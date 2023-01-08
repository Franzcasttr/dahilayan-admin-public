import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../config/API';

interface Users {
  users: string[];
  loading: boolean;
  error: boolean;
  errorMsg: string;
}

export const getAllUsers = createAsyncThunk(
  'users/GetAllUsers',
  async (payload, thunkAPI) => {
    const res = await API.get('users/getAllUsers');
    const { user } = res.data;
    if (res.status === 200) {
      return user;
    }
    return res.data.errorMsg;
  }
);

const initialState: Users = {
  users: [],
  loading: false,
  error: false,
  errorMsg: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {},
    removeUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMsg = action.payload as string;
    });
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
