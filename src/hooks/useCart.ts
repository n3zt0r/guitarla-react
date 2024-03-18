import { useEffect, useMemo, useState } from "react";
import { db } from "../data/db";
import type { Guitar, CartItem } from "../types";

export const useCart = () => {
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart());

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Guitar) => {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExist >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemExist].quantity++;
      setCart(updatedCart);
    } else {
      const newItem: CartItem = { ...item, quantity: 1 };
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (id: Guitar["id"]) => {
    setCart((prevCart) => prevCart.filter((guitar) => id !== guitar.id));
  };

  const incraseQuantity = (id: Guitar["id"]) => {
    const itemExist = cart.findIndex((guitar) => guitar.id === id);
    const updatedCart = [...cart];
    updatedCart[itemExist].quantity++;
    setCart(updatedCart);
  };

  const decreaseQuantity = (id: Guitar["id"]) => {
    const itemExist = cart.findIndex((guitar) => guitar.id === id);
    const updatedCart = [...cart];
    const quantity = (updatedCart[itemExist].quantity -= 1);
    if (quantity < 1) {
      removeFromCart(id);
    } else {
      setCart(updatedCart);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // State derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => item.price * item.quantity + total, 0),
    [cart]
  );

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    incraseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  };
};
