import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (item) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }
      return [...currentItems, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId, quantity) => {
    setItems((currentItems) =>
      quantity < 1
        ? currentItems.filter((item) => item.id !== itemId)
        : currentItems.map((item) =>
            item.id === itemId ? { ...item, quantity } : item,
          ),
    );
  };

  const removeFromCart = (itemId) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
  };

  const value = useMemo(
    () => ({ items, addToCart, updateQuantity, removeFromCart }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error('useCart must be used within a CartProvider.');
  }
  return cart;
}
