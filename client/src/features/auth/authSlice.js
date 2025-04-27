import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService.js'

const initialState = {
  user:  window.localStorage.getItem("auth") ? JSON.parse(window.localStorage.getItem("auth")) : null,
  status: '',
  token: window.localStorage.getItem("token") ? JSON.parse(window.localStorage.getItem("token")) : null,
  error:null,
}

// this function use in loginPage
export const login = createAsyncThunk("auth/login", async (loginData, thunkAPI)=>{
  try {
      return await  authService.loginUser(loginData)
  } catch (error) {
      return thunkAPI.rejectWithValue(error)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action)=>{
      state.token=""
      state.user=""
  },
   
  },
  extraReducers:(builder)=>{
    builder.addCase(login.pending, (state)=>{
        state.status = "loading";
    }).addCase(login.fulfilled, (state,action)=>{
        state.status = "success"; // data recived or req. completed 
        state.user = action.payload
    }).addCase(login.rejected, (state,action)=>{
        state.status = "failed";
        state.error = action.payload
    })
  }
})

export const { logout } = authSlice.actions

export default authSlice.reducer