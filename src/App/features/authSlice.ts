import { LoginResponseType } from "../../types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
  userInfo: LoginResponseType | null;
  isAuthenticated: boolean;
}


const getUserFromStorage = (): LoginResponseType | null => {
  const userInfoString = localStorage.getItem("userInfo");
  if (!userInfoString) return null;
  try {
    return JSON.parse(userInfoString);
  } catch {
    return null;
  }
};


const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: getUserFromStorage(),
    isAuthenticated: !!getUserFromStorage(),
  } as AuthState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponseType>) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logOut: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      localStorage.removeItem("userInfo");
      window.location.href = "/login";
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;