import {PayloadAction, createSlice} from '@reduxjs/toolkit'

export  interface userState {
  jwt: string | null;
}

const initialState: userState = {
  jwt: null
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