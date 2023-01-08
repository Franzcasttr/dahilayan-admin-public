import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API } from '../../config/API';

export interface roomTypes {
  name: string;
  image_url: string[];
  price: number;
  bedtype: string[];
  number_of_guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
  description: string;
  editRoom: string[];
  url?: string[];
  editAmenities: string[];
  loading: boolean;
  error: boolean;
  errorMsg: string;
  message: string;
  rooms: [];
  numOfpages: number;
}

interface IUpdateRoom {
  name: string | undefined;
  image_url: string[];
  price: number | undefined;
  editRoom: string[];
  number_of_guests: number | undefined;
  bedrooms: number | undefined;
  beds: number | undefined;
  bathrooms: number | undefined;
  editAmenities: string[];
  desc: string | undefined;
  roomId: string | undefined;
}

// export interface Rooms {
//   name: string;
// }

export const GetAllRooms = createAsyncThunk(
  'rooms/GetAllRooms',
  async (payload: { pages: number; search: string }, thunkAPI) => {
    const { pages, search } = payload;

    const res = await API.get(
      `rooms/view?pages=${pages || 1}&search=${search || ''}`
    );
    if (res.status === 200) {
      return res.data;
    }
    return res.data.errorMsg;
  }
);
export const GetRooms = createAsyncThunk(
  'rooms/GetRooms',
  async (payload, thunkAPI) => {
    const res = await API.get(`rooms/view`);
    const { rooms } = res.data;
    if (res.status === 200) {
      return rooms;
    }
    return res.data.errorMsg;
  }
);

export const DeleteRooms = createAsyncThunk(
  'rooms/DeleteRooms',
  async (roomID: string, thunkAPI) => {
    const res = await API.delete(`rooms/deleteroom/${roomID}`);
    if (res.status === 200) {
      thunkAPI.dispatch(GetRooms());
      return res.data.msg;
    }
    return res.data.errorMsg;
  }
);
export const UpdateRoom = createAsyncThunk(
  'rooms/UpdateRoom',
  async (payload: IUpdateRoom, thunkAPI) => {
    const {
      name,
      image_url,
      price,
      editRoom,
      number_of_guests,
      bedrooms,
      beds,
      bathrooms,
      editAmenities,
      desc,
      roomId,
    } = payload;
    const res = await API.put(`rooms/updateroom/${roomId}`, {
      name,
      image_url,
      price,
      editRoom,
      number_of_guests,
      bedrooms,
      beds,
      bathrooms,
      editAmenities,
      desc,
    });
    if (res.status === 200) {
      thunkAPI.dispatch(GetRooms());
      return res.data.msg;
    }
    return res.data.errorMsg;
  }
);

const initialState: roomTypes = {
  name: '',
  image_url: [],
  price: 0,
  bedtype: [],
  number_of_guests: 0,
  bedrooms: 0,
  beds: 0,
  bathrooms: 0,
  amenities: [],
  description: '',
  editRoom: [],
  editAmenities: [],
  loading: false,
  error: false,
  errorMsg: '',
  message: '',
  rooms: [],
  numOfpages: 0,
};

export const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    bedType: (state, action) => {
      state.bedtype.push(action.payload);
    },
    removeBedType: (state, action) => {
      state.bedtype.splice(
        state.bedtype.findIndex((data) => data === action.payload),
        1
      );
    },
    editBedType: (state, action) => {
      if (action.payload instanceof Array) {
        state.editRoom = action.payload;
      } else {
        state.editRoom.push(action.payload);
      }
    },
    removeEditBedType: (state, action) => {
      state.editRoom.splice(
        state.editRoom.findIndex((data) => data === action.payload),
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
    addRoomAmenities: (state, action) => {
      state.amenities.push(action.payload);
    },
    removeRoomAmenities: (state, action) => {
      state.amenities.splice(
        state.amenities.findIndex((data) => data === action.payload),
        1
      );
    },
    editRoomAmenities: (state, action) => {
      state.editAmenities = action.payload;
    },
    removeEditAmenities: (state, action) => {
      state.editAmenities.splice(
        state.editAmenities.findIndex((data) => data === action.payload),
        1
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetAllRooms.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetAllRooms.fulfilled, (state, action) => {
      state.loading = false;
      state.rooms = action.payload.rooms;
      state.numOfpages = action.payload.numberOfPages;
    });
    builder.addCase(GetAllRooms.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMsg = action.payload as string;
    });
    builder.addCase(GetRooms.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetRooms.fulfilled, (state, action) => {
      state.loading = false;
      state.rooms = action.payload;
    });
    builder.addCase(GetRooms.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMsg = action.payload as string;
    });
    builder.addCase(DeleteRooms.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(DeleteRooms.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
    builder.addCase(DeleteRooms.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMsg = action.payload as string;
    });
    builder.addCase(UpdateRoom.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(UpdateRoom.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
    builder.addCase(UpdateRoom.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMsg = action.payload as string;
    });
  },
});

export default roomSlice.reducer;

export const {
  bedType,
  removeBedType,
  addRoomAmenities,
  removeRoomAmenities,
  editBedType,
  removeEditBedType,
  handleImages,
  removeImages,
  editRoomAmenities,
  removeEditAmenities,
} = roomSlice.actions;
