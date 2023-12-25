import React, { useEffect, useState } from "react";
import "./Product.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useGetAllProductQuery } from "../../features/product/product";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCreateCartMutation } from "../../features/cart/cart";

const Product = () => {
  const { data, isLoading, isError, error } = useGetAllProductQuery();
  const [products, setProducts] = useState([]);
  console.log("products", products);
  useEffect(() => {
    if (isError) {
      // Handle error, you can log it or display an error message.
      console.error("Error fetching cart data:", error);
    } else if (!isLoading) {
      // Only set the cart if there is data and it's not already set to avoid infinite re-renders.
      if (data) {
        setProducts(data);
      }
    }
  }, [data, isLoading, isError, error]);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  console.log("selectedColor", selectedColor);
  console.log("selectedSize", selectedSize);
  const handleColorChange = (color) => {
    if (color) {
      toast.success("Successfully select color");
      setSelectedColor(color);
    }
  };

  const handleSizeChange = (size) => {
    if (size) {
      toast.success("Successfully select size");
      setSelectedSize(size);
    }
  };

  const [createCart] = useCreateCartMutation();

  const handleAddToCart = async (product) => {
    const data = {
      title: product.title,
      image: product.image,
      color: selectedColor,
      size: selectedSize,
    };

    const res = await createCart(data);

    if (res) {
      toast.success("Successfully added product on cart");
    }
    console.log("handleAddToCart", data);
  };

  return (
    <div>
      <section className="product">
        <div className="container">
          <div className="row mt-5">
            <div className="col-xl-12 col-lg-12">
              <div className="row">
                {isLoading ? (
                  <h2 className="text-center">Loading...</h2>
                ) : products.length > 0 ? (
                  products.map((product) => (
                    <div
                      className="col-xl-3 col-lg-3 col-md-6"
                      style={{ marginBottom: "40px" }}
                      key={product.id} // Add a unique key for each item in the map function
                    >
                      <Card
                        className="text-center mb-3"
                        style={{ width: "18rem" }}
                      >
                        <Link
                          to={`/product-details/${product._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Card.Img
                            variant="top"
                            src={`http://localhost:5000/${product.image}`}
                          />
                        </Link>
                        <Card.Body>
                          <Card.Text className="reviews">
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                          </Card.Text>
                          <Card.Title className="fs-4">
                            {product.title}
                          </Card.Title>
                          <div>
                            <div className="mb-2">
                              <span
                                className="me-2"
                                style={{ fontWeight: "bold", fontSize: "18px" }}
                              >
                                Color:
                              </span>
                              <button
                                style={{
                                  backgroundColor: "black",
                                  color: "white",
                                }}
                                onClick={() => handleColorChange("black")}
                              >
                                Black
                              </button>
                              <button
                                style={{
                                  backgroundColor: "#92705C",
                                  color: "white",
                                }}
                                onClick={() => handleColorChange("beaver")}
                              >
                                Beaver
                              </button>
                              {/* <p>Selected Color: {selectedColor}</p> */}
                            </div>

                            <div className="mb-3">
                              <span
                                className="me-2"
                                style={{ fontWeight: "bold", fontSize: "18px" }}
                              >
                                Size:
                              </span>
                              {/* <button onClick={() => handleSizeChange("small")}>
                                Small
                              </button> */}
                              <button onClick={() => handleSizeChange("Small")}>
                                Small
                              </button>
                              <button
                                onClick={() => handleSizeChange("Medium")}
                              >
                                Medium
                              </button>

                              <p>
                                <span style={{ fontWeight: "bold" }}>
                                  Selected Size:
                                </span>{" "}
                                {selectedSize}
                              </p>
                            </div>
                          </div>

                          <Button
                            onClick={() => handleAddToCart(product)}
                            className="product_btn"
                          >
                            ADD TO CART
                          </Button>
                        </Card.Body>
                      </Card>
                    </div>
                  ))
                ) : (
                  <h2 className="text-center">No products found</h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
