"use client";

import { useEffect, useState } from "react";
import MovieList from "./components/movie-list";
import Cart from "./components/cart";
import CheckoutDialog from "./components/checkout-dialog";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

const Home = () => {
  const [cart, setCart] = useState<Movie[]>([]);
  const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false);

  // ดึงข้อมูลตะกร้าจาก localStorage เมื่อโหลดหน้าเว็บ
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // บันทึกข้อมูลตะกร้าลงใน localStorage เมื่อตะกร้ามีการเปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (movie: Movie) => {
    setCart((prevCart) => [...prevCart, movie]);
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkout = () => {
    setIsCheckoutDialogOpen(true);
  };

  const removeFromCart = (movieId: number) => {
    setCart((prevCart) => prevCart.filter((movie) => movie.id !== movieId));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <Cart
        cart={cart}
        clearCart={clearCart}
        checkout={checkout}
        removeFromCart={removeFromCart}
      />
      <div className="px-8">
        <MovieList addToCart={addToCart} cart={cart} />
      </div>
      <CheckoutDialog
        isOpen={isCheckoutDialogOpen}
        onClose={() => setIsCheckoutDialogOpen(false)}
      />
    </div>
  );
};

export default Home;
