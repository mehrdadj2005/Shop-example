import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Status {
  status: boolean;
}

const initialState = {
  status: false,
};

const authSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Status>) {
      state.status = true;
    },
    clearCart(state) {
      state.status = false;
    },
  },
});

export const { addItem, clearCart } = authSlice.actions;
export default authSlice.reducer;
