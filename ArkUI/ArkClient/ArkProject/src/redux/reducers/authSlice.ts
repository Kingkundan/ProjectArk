import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { logOutApi, loginApi, registerApi } from "../../utils/auth";

export interface AuthState {
  user: any;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  isAuthenticated: !!localStorage.getItem('accessToken'),
  loading: false,
  error: null,
};

export const logOut = createAsyncThunk(
  'auth/logOut',
  async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('LastAccess');
    const response = await logOutApi();
    return response.data;
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }) => {
    try{

      const response = await loginApi(credentials);
      localStorage.setItem('accessToken', response.data);
      localStorage.setItem("LastAccess", Date.now().toString());
      return response.data;
    }
    catch(error:any){
      console.log(error.response?.data);
      throw error;
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (data: { email: string; password: string; name: string }) => {
    const response = await registerApi(data);
    localStorage.setItem('accessToken', response.data.accessToken);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    // logout(state) {
    //   state.user = null;
    //   state.accessToken = null;
    //   state.isAuthenticated = false; 
    //   localStorage.removeItem('accessToken');
    //   localStorage.removeItem('LastAccess');
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(logOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logOut.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      });
  },
});

export const { setIsAuthenticated } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
