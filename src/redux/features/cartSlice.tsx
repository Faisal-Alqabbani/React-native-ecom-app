import {createSlice, PayloadAction} from '@reduxjs/toolkit';
interface CartItem {
  toFixed(arg0: number): import('react').ReactNode;
  id: number;
  title: string;
  price: number;
  quantity?: number;
  image: string;
}
interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const {id, quantity = 1} = action.payload; // I put the default quantity is one
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        // @ts-ignore
        existingItem.quantity += quantity; // Increase quantity
      } else {
        state.items.push({...action.payload, quantity});
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{id: number; quantity: number}>,
    ) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity; // Update quantity
      }
    },
  },
});

export const {addToCart, removeFromCart, updateQuantity} = cartSlice.actions;
export default cartSlice.reducer;
