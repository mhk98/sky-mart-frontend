import React, { useEffect, useState } from "react";

import {
  useDeleteCartMutation,
  useGetAllCartQuery,
} from "../../features/cart/cart";
import "./Cart.css";
const Cart = () => {
  // const router = useRouter();
  // const userLoggedIn = isLoggedIn();
  // console.log("userLoggedIn", userLoggedIn);

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

    // Recalculate and update the subtotal, discount, and total
    const updatedSubtotal = calculateTotal();

    const updatedDiscount = appliedDiscount; // You might need to recalculate the discount based on the updated cart.
    const updatedTotal = updatedSubtotal - updatedDiscount;
    setCartTotal(updatedTotal);

    // Update the local storage with the new cart data after changing the state
    const updatedCart = JSON.stringify(cart);
    localStorage.setItem("cart", updatedCart);
  };

  // Function to calculate the subtotal of an item
  const calculateSubtotal = (price, quantity) => price * quantity;

  // Function to calculate the total cart price
  const calculateTotal = () =>
    cart.reduce(
      (total, item) => total + calculateSubtotal(item.price, item.quantity),
      0
    );

  const [deleteCart] = useDeleteCartMutation();
  const handleDelete = async (id) => {
    if (id) {
      if (window.confirm("Do you want to delete?")) {
        // First, update the state by filtering the item

        console.log("productId", id);
        const res = await deleteCart(id);

        // const updatedCart = cart.filter((item) => item.Cart_Id !== id);
        // setCart(updatedCart);

        // // Recalculate and update the subtotal, discount, and total
        // const updatedSubtotal = calculateTotal();
        // const updatedDiscount = appliedDiscount; // You might need to recalculate the discount based on the updated cart.
        // const updatedTotal = updatedSubtotal - updatedDiscount;
        // setCartTotal(updatedTotal);

        // // Update the local storage with the new cart data after removing the item
        // const updatedCartJSON = JSON.stringify(updatedCart);
        // localStorage.setItem("cart", updatedCartJSON);
      }
    }
  };

  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [cartTotal, setCartTotal] = useState(calculateTotal());

  // Function to handle changes in the coupon code input field
  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
  };

  // Function to apply the coupon and calculate the discount
  // const applyCoupon = () => {
  //   // You can add logic here to validate the coupon code and calculate the discount.
  //   // For this example, we'll apply a fixed 20% discount if the coupon is "OCT".

  //   if (couponCode === "OCT20") {
  //     const totalBeforeDiscount = calculateTotal();
  //     const discount = (totalBeforeDiscount * 20) / 100; // 20% discount
  //     const discountedTotal = totalBeforeDiscount - discount;

  //     setAppliedDiscount(discount);
  //     setCartTotal(discountedTotal);
  //   }
  // };

  // const handleProceedToCheckout = () => {
  //   // Calculate the subtotal and total one more time
  //   const subtotal = calculateTotal();
  //   const total = subtotal - appliedDiscount;

  //   // Store the values in localStorage
  //   localStorage.setItem("subtotal", subtotal.toFixed(2));
  //   localStorage.setItem("total", total.toFixed(2));

  //   // router.push("/dark/shop-checkout/", { scroll: false });
  // };

  // const handleAlertCheckout = () => {
  //   const confirmed = window.confirm(
  //     "Please login first. Do you want to go to the login page?"
  //   );

  //   if (confirmed) {
  //     router.push("/dark/login");
  //   }
  // };
  // const [createOrder] = useCreateOrderMutation();
  // const handleCreateOrder = async () => {
  //   const subtotal = calculateTotal();
  //   const total = subtotal - appliedDiscount;
  //   const data = {
  //     orderDetails: cart,
  //     subtotal: subtotal.toFixed(2),
  //     total: total.toFixed(2),
  //   };
  //   const res = await createOrder(data);
  //   if (res) {
  //     toast.success("Now you are ready for proceed checkout");
  //     router.push("/dark/shop-checkout");
  //   }
  // };
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
