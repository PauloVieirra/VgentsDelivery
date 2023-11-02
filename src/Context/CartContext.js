import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import localforage from 'localforage';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const cartStorage = localforage.createInstance({
  name: 'myAppCart', // Nome do espaço de armazenamento
  storeName: 'cart', // Nome do objeto de armazenamento
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    cartStorage.getItem('cartItems').then((savedCart) => {
      if (savedCart) {
        setCartItems(savedCart);
      }
    });
  }, []);

  const addToCart = useCallback((item) => {
    // Verifique se o item já está no carrinho
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // Se o item já existir, atualize a quantidade em vez de adicionar um novo
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCartItems(updatedCart);
      cartStorage.setItem('cartItems', updatedCart);
    } else {
      // Se o item não existir, adicione-o ao carrinho
      const updatedCart = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(updatedCart);
      cartStorage.setItem('cartItems', updatedCart);
    }
  }, [cartItems]);

  const removeFromCart = useCallback((item) => {
    // Use a função filter para criar uma nova lista de itens que exclui o item a ser removido
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);

    // Atualize o estado do carrinho e o localForage com a nova lista
    setCartItems(updatedCart);
    cartStorage.setItem('cartItems', updatedCart);
  }, [cartItems]);

  const increaseQuantity = useCallback((item) => {
    const foundItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (foundItem) {
      foundItem.quantity += 1;
      setCartItems([...cartItems]);
      cartStorage.setItem('cartItems', cartItems);
    }
  }, [cartItems]);

  const decreaseQuantity = useCallback((item) => {
    // Encontre o item no carrinho
    const foundItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (foundItem) {
      // Diminua a quantidade em 1, se for maior que 1, e atualize o estado e o localForage
      if (foundItem.quantity > 1) {
        foundItem.quantity -= 1;
        setCartItems([...cartItems]);
        cartStorage.setItem('cartItems', cartItems);
      }
    }
  }, [cartItems]);

  const getItemCount = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const getTotalPrice = useCallback(() => {
    let total = 0;
  
   
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
  
    return total;
  }, [cartItems]);

 

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, getItemCount, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

