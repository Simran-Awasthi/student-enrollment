import { createSlice } from "@reduxjs/toolkit";

//this is redux folder

const nameCapital = (naam) => {
  return naam.charAt(0).toUpperCase() + naam.slice(1);
};

export const user = createSlice({
  name: "user",
  initialState: {
    register: false,
    detail: false,
  },
  reducers: {
    ENROLL: (state, action) => {
      return { ...state, register: action.payload };
    },
    SHOW: (state, action) => {
      return { ...state, register: action.payload };
    },
  },
});

export const { ENROLL, SHOW } = user.actions;
export default user.reducer;
