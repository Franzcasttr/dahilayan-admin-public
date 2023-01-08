import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../config/API';

interface Bookings {
  totalBookings: number;
  totalCheckINandOUT: {
    CHECKIN: number;
    CHECKOUT: number;
  }[];

  loading: boolean;
  error: boolean;
  errorMsg: string;
}

export const getAllBookings = createAsyncThunk(
  'bookings/GetAllBookings',
  async (payload, thunkAPI) => {
    const res = await API.get('bookings/getAllBookings');
    const { totalBookings } = res.data;
    if (res.status === 200) {
      return totalBookings;
    }
    return res.data.errorMsg;
  }
);

export const getVisitorsCheckCount = createAsyncThunk(
  'bookings/GetCheckInOutCount',
  async (payload, thunkAPI) => {
    const res = await API.get('bookings/getCheckInOutCount');
    const { result } = res.data;
    if (res.status === 200) {
      return result;
    }
    return res.data.errorMsg;
  }
);

const initialState: Bookings = {
  totalBookings: 0,
  totalCheckINandOUT: [],

  loading: false,
  error: false,
  errorMsg: '',
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBookings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllBookings.fulfilled, (state, action) => {
      state.loading = false;
      state.totalBookings = action.payload;
    });
    builder.addCase(getAllBookings.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMsg = action.payload as string;
    });
    builder.addCase(getVisitorsCheckCount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVisitorsCheckCount.fulfilled, (state, action) => {
      state.loading = false;
      state.totalCheckINandOUT = action.payload;
    });
    builder.addCase(getVisitorsCheckCount.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMsg = action.payload as string;
    });
  },
});

export default bookingSlice.reducer;
