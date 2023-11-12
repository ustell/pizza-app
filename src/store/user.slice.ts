import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { loadState } from './storage';

export const JWT_INITIAL = "userData"

export  interface userState {
  jwt: string | null;
}

// store.subscribe(()=>{
//   saveState({jwt: store.getState().user.jwt}, JWT_INITIAL);
// }) берет инфу из interface userState 

export  interface userInitial {
  jwt: string | null;
}

const initialState: userState = {
  jwt: loadState<userInitial>(JWT_INITIAL)?.jwt ?? null // получаем ключ userData
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    addJwt : (state, action: PayloadAction<string>) => {
      state.jwt = action.payload
    },
    delJwt : (state) => {
      state.jwt = null
    }
  }
})

export default userSlice.reducer
export const userAction = userSlice.actions