import { configureStore, createSlice } from '@reduxjs/toolkit';

const  authSlice = createSlice({
   name: 'auth',
   initialState: {
      isAuthenticated: false,
      token: null,
   },
   reducers: {
      login: (state, action) => {
         state.isAuthenticated = true;
         state.token = action.payload.token;
         state.user = {
            username: action.payload.username,
            admin: action.payload.owner
         };

      },
      logout: (state) => {
         state.isAuthenticated = false;
         state.token = null;
      },
   },
});

export const { login, logout } = authSlice.actions;

export const store = configureStore({
   reducer: {
      auth: authSlice.reducer,
   },
});