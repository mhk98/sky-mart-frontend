import React, { useEffect, useState } from "react";

import {
  useDeleteCartMutation,
  useGetAllCartQuery,
} from "../../features/cart/cart";
import "./Cart.css";
const Cart = () => {
  const { data, isLoading, isError, error } = useGetAllCartQuery();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (isError) {
      // Handle error, you can log it or display an error message.
      console.error("Error fetching cart data:", error);
    } else if (!isLoading) {
      // Only set the cart if there is data and it's not already set to avoid infinite re-renders.
      if (data && data.data) {
        setCart(data.data);
      }
    }
  }, [data, isLoading, isError, error]);

  // Function to update the cart item quantity and update local storage
  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item._id === id) {
          // Update the quantity of the specific item
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const [deleteCart] = useDeleteCartMutation();
  const handleDelete = async (id) => {
    if (id) {
      if (window.confirm("Do you want to delete?")) {
        // First, update the state by filtering the item

        console.log("productId", id);
        const res = await deleteCart(id);
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row ">
          <div className="col-lg-11 col-xl-12">
            <div>
              <h1 className="mb-3">Prodct Cart</h1>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    {/* <th>Price</th> */}
                    <th>Quantity</th>
                    {/* <th>Subtotal</th> */}
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.map((item) => (
                    <tr key={item._id}>
                      <td data-column="Product">
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="img icon-img-80">
                              {/* <Image src={item.image} alt={item.title} /> */}
                              <img
                                src={`http://localhost:5000/${item.image}`}
                                alt=""
                                width={70}
                                height={50}
                              />
                            </div>
                          </div>
                          <div className="ml-30">
                            <h6>{item.title}</h6>
                          </div>
                        </div>
                      </td>

                      <td data-column="Quantity">
                        <div className="counter">
                          <span
                            className="down"
                            onClick={() =>
                              updateQuantity(item._id, item.quantity - 1)
                            }
                          >
                            -
                          </span>
                          <input type="text" value={item.quantity} readOnly />
                          <span
                            className="up"
                            onClick={() =>
                              updateQuantity(item._id, item.quantity + 1)
                            }
                          >
                            +
                          </span>
                        </div>
                      </td>

                      <td className="remove">
                        <button
                          style={{ backgroundColor: "white", color: "black" }}
                          onClick={() => {
                            handleDelete(item._id);
                          }}
                        >
                          <span className="pe-7s-close">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="16"
                              width="14"
                              viewBox="0 0 448 512"
                            >
                              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                            </svg>
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
