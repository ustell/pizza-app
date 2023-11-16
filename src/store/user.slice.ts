import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { loadState } from './storage';
import axios, { AxiosError } from 'axios';
import { LoginToken } from '../Interfase/Auth.interface';

export const JWT_INITIAL = "userData"

export  interface userState {
  jwt: string | null;
  loginInvalid?: string    
}

// store.subscribe(()=>{
//   saveState({jwt: store.getState().user.jwt}, JWT_INITIAL);
// }) берет инфу из interface userState 

export  interface userInitial {
  jwt: string | null;
}

const initialState: userState = {
  jwt: loadState<userInitial>(JWT_INITIAL)?.jwt ?? null, // получаем ключ userData
}

export const login = createAsyncThunk("user/login", 
async (params: {email: string; password: string})=> {
      try {
        const { data } = await axios.post<LoginToken>(
          'https://purpleschool.ru/pizza-api-demo/auth/login',
          {
            email: params.email,
            password: params.password,
          },
        );
        return data
      } 
      catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
    
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    addJwt : (state, action: PayloadAction<string>) => {
      state.jwt = action.payload
    },
    clearLoginError: (state)=>{
      state.loginInvalid = undefined 
    },
    logout : (state) => {
      state.jwt = null
    }
  },
  extraReducers: (builder) => {
     builder.addCase(login.fulfilled, (state, action) =>{
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.access_token
     })
     builder.addCase(login.rejected, (state, action) =>{
      state.loginInvalid = action.error.message
    })
    }
})

export default userSlice.reducer
export const userAction = userSlice.actions