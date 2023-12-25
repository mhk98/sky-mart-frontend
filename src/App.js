import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import RequireAuth from "./Components/Auth/RequireAuth";
import { Toaster } from "react-hot-toast";
import Header from "./Components/Header/Header";

import store from "./app/store";
import ProductDetails from "./Components/productDetails/ProductDetails";
import Product from "./Components/product/Product";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Privacy from "./Components/Privacy";
import { Provider } from "react-redux";
import Cart from "./Components/cart/Cart";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Product />
              </RequireAuth>
            }
          />
          <Route
            path="/product-details/:id"
            element={
              <RequireAuth>
                <ProductDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/cart"
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />
          <Route
            path="/about"
            element={
              <RequireAuth>
                <About />
              </RequireAuth>
            }
          />
          <Route
            path="/contact"
            element={
              <RequireAuth>
                <Contact />
              </RequireAuth>
            }
          />
          <Route
            path="/privacy"
            element={
              <RequireAuth>
                <Privacy />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Toaster />
      </div>
    </Provider>
  );
};

export default App;
