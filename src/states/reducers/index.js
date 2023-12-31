import { createSlice } from "@reduxjs/toolkit";

const nameCapital = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const user = createSlice({
  name: "user",
  initialState: {
    register: false,
    detail: false,
    name: "",
    age: "",
  },
  reducers: {
    ENROLL: (state, action) => {
      return { ...state, register: action.payload };
    },
    SHOW: (state, action) => {
      return { ...state, register: action.payload };
    },
    NAME: (state, action) => {
      return { ...state, name: nameCapital(action.payload) };
    },
    AGE: (state, action) => {
      return { ...state, age: action.payload, detail: true };
    },
  },
});

export const { ENROLL, SHOW, NAME, AGE } = user.actions;
export default user.reducer;
