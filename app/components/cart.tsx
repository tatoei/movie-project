"use client";
import { useState, useEffect } from "react";

interface Movie {
  id: number;
  title: string;
}

interface CartProps {
  cart: Movie[];
  clearCart: () => void;
  checkout: () => void;
  removeFromCart: (movieId: number) => void;
}

const Cart = ({ cart, clearCart, checkout, removeFromCart }: CartProps) => {
  const [discount, setDiscount] = useState<number>(0);

  useEffect(() => {
    if (cart.length >= 5) {
      setDiscount(20);
    } else if (cart.length >= 3) {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  }, [cart]);

  return (
    <div className="bg-white p-6 w-full rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      <ul className="space-y-2">
        {cart.map((movie) => (
          <li key={movie.id} className="flex justify-between items-center">
            <span className="text-gray-700">{movie.title}</span>
            <button
              onClick={() => removeFromCart(movie.id)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <p className="text-gray-700">
          Discount: <span className="font-bold">{discount}%</span>
        </p>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={clearCart}
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
        >
          Clear Cart
        </button>
        <button
          onClick={checkout}
          className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
