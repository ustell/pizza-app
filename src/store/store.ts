import { configureStore } from "@reduxjs/toolkit";
import userSlice, { JWT_INITIAL } from "./user.slice";
import { saveState } from "./storage";
import cardSlice from "./card.slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    card: cardSlice
  }
})

store.subscribe(()=>{
  saveState({jwt: store.getState().user.jwt}, JWT_INITIAL); // мы сохраняем данные передаем jwt как ключ и store.getState()... как значение а второй аргумент это ключ userData
})

// буду по новой делать но лучше смотреть 3 файла store.ts, storage.ts, user.slice.ts

export type RootState = ReturnType <typeof store.getState>;
export type AppDispath = typeof store.dispatch