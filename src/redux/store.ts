// redux/store.ts
import {configureStore} from '@reduxjs/toolkit';
import toastReducer from './features/toastSlice';
import cartReducer from './features/cartSlice';

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
