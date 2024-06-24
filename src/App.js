import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { CartProvider } from './CartContext';
import { AuthProvider } from './AuthContext';

//components
import NavBar from './components/nav-bar/nav-bar';

//pages
import Home from './pages/home/home'
import Shop from './pages/shop/shop'
import About from './pages/about/about'
import Contacts from './pages/contacts/contacts'
import Cart from './pages/cart/cart'
import ProductPage from './pages/product-page/productPage';
import Orders from './pages/orders/orders';

function App() {

  return (
    <CartProvider>
    <AuthProvider>
      <div className="App">
        <Router>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/orders' element={<Orders />}></Route>
            <Route path='/shop' element={<Shop />}></Route>
            <Route path='/product/:productId' element={<ProductPage />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/contacts' element={<Contacts />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
          </Routes>
        </Router>
      </div>
    </AuthProvider>
    </CartProvider>
  );
}

export default App;
