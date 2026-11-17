import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "@/services/api/authApi";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAuthInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isAuthInitialized: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAuthInitialized = true;
    },

    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAuthInitialized = true;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;