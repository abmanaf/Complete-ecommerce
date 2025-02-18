import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enteredDetails: JSON.parse(localStorage.getItem("users")) || [],
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const userExists = state.enteredDetails.some(
        (user) => user.email === action.payload.email
      );
      if (!userExists) {
        state.enteredDetails.push(action.payload);
        localStorage.setItem("users", JSON.stringify(state.enteredDetails));
      }
    },
    logUserIn: (state, action) => {
      const { email, password } = action.payload;
      const user = state.enteredDetails.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        state.currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
    },
    logUserOut: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
    userResetPassword: (state, action) => {
        const { email, newPassword } = action.payload;
        const user = state.enteredDetails.find((user) => user.email === email);
        if (user) {
          user.password = newPassword;
          localStorage.setItem("users", JSON.stringify(state.enteredDetails));
        }
      }, 
  },
});

export const { addUser, logUserIn, logUserOut, userResetPassword } = userSlice.actions;
export default userSlice.reducer;
