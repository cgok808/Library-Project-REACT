import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import Books from "./Pages/Books";
import { books } from './data';
import BookInfo from "./Pages/BookInfo";
import Cart from "./Pages/Cart";
import React, { useState, useEffect } from "react";


function App() {
  const [cart, setCart] = useState([]);

  function addToCart(book) {
    const dupeItem = cart.find((item) => item.id === book.id);
    setCart((oldCart) =>
      dupeItem
        ? [
            ...oldCart.map((item) => {
              return item.id === dupeItem.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item;
            }),
          ]
        : [...oldCart, { ...book, quantity: 1 }]
    );
  }
  
  function changeQuantity(book, quantity) {
    setCart(
      cart.map((item) => item.id === book.id
        ? {
          ...item,
          quantity: +quantity,
        }
        : item
      )
    );
  }

  function removeItem(item) {
    setCart(cart.filter(book => book.id !== item.id))
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach(item => {
      counter += item.quantity
    })
    return counter;
  }

  useEffect(() => {
    console.log(cart)
  }, [cart])

  function calcPrices() {
    let total = 0;
    cart.forEach((item) => {
      total += (item.salePrice || item.originalPrice) * item.quantity;
    });
    return {
      subtotal: total * 0.9,
      tax: total * 0.1,
      total,
    };
  }
  
  return (
    <Router>
      <div className="App">
        <Nav numberOfItems={numberOfItems()}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books books={books} />} />
          <Route path="/books/:id" element={<BookInfo books={books} addToCart={addToCart} cart={cart} />} />
          <Route path="/cart" element={<Cart books={books} cart={cart} changeQuantity={changeQuantity} removeItem={removeItem} totals={calcPrices()} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
