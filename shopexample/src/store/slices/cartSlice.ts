import { ProfileProductCardType } from "@/types/profile/productCard";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: ProfileProductCardType[];
}
const savedCart = localStorage.getItem("cart");

const initialState: CartState = {
  items: savedCart ? JSON.parse(savedCart) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addQty(state, action: PayloadAction<ProfileProductCardType>) {
      const existing = state.items.find(
        (i) =>
          i.id === action.payload.id &&
          i.color == action.payload.color &&
          i.size == action.payload.size &&
          i.image == action.payload.image &&
          i.description == action.payload.description &&
          i.price == action.payload.price &&
          i.discountedPrice == action.payload.discountedPrice
      );
      if (existing) {
        existing.qty += 1;
      }
    },
    lessQty(state, action: PayloadAction<ProfileProductCardType>) {
      const existing = state.items.find(
        (i) =>
          i.id === action.payload.id &&
          i.color == action.payload.color &&
          i.size == action.payload.size &&
          i.image == action.payload.image &&
          i.description == action.payload.description &&
          i.price == action.payload.price &&
          i.discountedPrice == action.payload.discountedPrice
      );
      if (existing) {
        existing.qty -= 1;
        if (existing.qty <= 0) {
          state.items = state.items.filter((item) => item !== existing);
        }
      }
    },
    addItem(state, action: PayloadAction<ProfileProductCardType>) {
      state.items.push(action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, clearCart, lessQty, addQty } = cartSlice.actions;
export default cartSlice.reducer;
