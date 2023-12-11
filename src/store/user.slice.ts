import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { loadState } from './storage';
import axios, { AxiosError } from 'axios';
import { LoginToken } from '../Interfase/Auth.interface';
import { Profile } from '../Interfase/user.interface';
import { RootState } from './store';
import { Register } from '../Interfase/Register.interface';

export const JWT_INITIAL = "userData"

export  interface userState {
  jwt: string | null;
  loginInvalid?: string    
  profile?: Profile
  registerInvalid?: string
}

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


export const getProfile = createAsyncThunk<Profile, void, {state: RootState}>("user/getProfile", 
  async (_, thunkApi) => {
    const jwt = thunkApi.getState().user.jwt
    const { data } = await axios.get<Profile>(
          'https://purpleschool.ru/pizza-api-demo/user/profile',
          {
          headers: {
            Authorization:`Bearer ${jwt}`
          }
          },
        );
        return data
  }
)

export const register = createAsyncThunk("user/register", 
  async (params: {email: string; password: string, name: string})=> {
    const { data } = await axios.post<Register>(
      'https://purpleschool.ru/pizza-api-demo/auth/register',
      {
        email: params.email,
        password: params.password,
        name: params.name,
      },
    );
    return data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logout : (state) => {
      state.jwt = null
    },
    clearLoginError: (state)=>{
      state.loginInvalid = undefined 
    },
    clearRegisterInvalid:(state)=>{
      state.registerInvalid = undefined
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
     builder.addCase(getProfile.fulfilled, (state, action) =>{
      state.profile = action.payload;
    })
     builder.addCase(register.fulfilled, (state, action) =>{
      if (!action.payload) {
        return
      }
      state.jwt= action.payload.access_token;
    })
    builder.addCase(register.rejected, (state, action) =>{
      state.registerInvalid = action.error.message
    })
    
  },
})

export default userSlice.reducer
export const userAction = userSlice.actions