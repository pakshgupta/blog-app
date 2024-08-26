import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      console.log(action.payload);
      localStorage.setItem("testKey", "testValue");
      console.log(localStorage.getItem("testKey"));
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
