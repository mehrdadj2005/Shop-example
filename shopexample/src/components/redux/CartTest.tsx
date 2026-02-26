"use client";

import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearCart } from "../../store/slices/cartSlice";

export default function CartTest() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const sampleProduct = { id: "p1", name: "تیشرت", price: 100, qty: 1 };

  return (
    <div style={{ padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>تست سبد خرید</h2>

      <button
        style={{ marginRight: 10 }}
        onClick={() => dispatch(addItem(sampleProduct))}
      >
        افزودن به سبد
      </button>
      <button onClick={() => dispatch(clearCart())}>خالی کردن سبد</button>

      <div style={{ marginTop: 20 }}>
        <h3>سبد خرید</h3>
        <p>تعداد آیتم‌ها: {cart.items.length}</p>
        <ul>
          {cart.items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.qty} عدد - {item.price} تومان
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
