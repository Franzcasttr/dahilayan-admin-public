import { configureStore } from '@reduxjs/toolkit';
import roomReducer from '../features/rooms/roomSlice';
import ridesReducer from '../features/rides/ridesSlice';
import venueReducer from '../features/venues/venueSlice';
import userReducer from '../features/user/userSlice';
import bookingReducer from '../features/bookings/bookingSlice';

export const store = configureStore({
  reducer: {
    rooms: roomReducer,
    rides: ridesReducer,
    venue: venueReducer,
    user: userReducer,
    bookings: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
