import React, { useEffect, useState } from "react";
import "../product/Product.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useGetSingleProductDetailsQuery } from "../../features/productDetails/productDetails";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  console.log("params", id);
  const { data, isLoading, isError, error } =
    useGetSingleProductDetailsQuery(id);

  const [product, setProduct] = useState([]);
  useEffect(() => {
    if (isError) {
      console.error("Error fetching data:", error);
    } else if (!isLoading) {
      if (data) {
        setProduct(data.data);
      }
    }
  }, [data, isLoading, isError, error]);

  const [selectedColor, setSelectedColor] = useState("white");

  const handleButtonClick = (color) => {
    setSelectedColor(color);
  };

  const [selectedSize, setSelectedSize] = useState("Small");

  const handleSizeChange = (size) => {
    if (size) {
      toast.success("Successfully select size");
      setSelectedSize(size);
    }
  };

  return (
    <div>
      <section class="product-details">
        <div class="container">
          {isLoading ? (
            <h2>Loading...</h2>
          ) : data ? (
            <div class="row">
              <div class="col-lg-6 col-xl-6">
                <div class="product-details__img">
                  {/* <img src={`http://localhost:5000/${product.image}`} alt="" /> */}

                  {selectedColor === "black" && (
                    <img
                      src={`http://localhost:5000/${product.image1}`}
                      alt="Black"
                      // style={{ width: "300px" }}
                    />
                  )}

                  {selectedColor === "white" && (
                    <img
                      src={`http://localhost:5000/${product.image2}`}
                      alt="White"
                      // style={{ width: "300px" }}
                    />
                  )}
                </div>
              </div>
              <div class="col-lg-6 col-xl-6">
                <div class="product-details__top">
                  <h3 class="product-details__title">{product.title}</h3>
                </div>
                <div class="product-details__reveiw">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <span>2 customer reviews</span>
                </div>
                <h2 className="mb-3">Choose Prodcut Color</h2>

                <div className="color-btn">
                  <button
                    style={{
                      padding: "8px 25px",
                      fontSize: "20px",
                      fontWeight: "600",
                      backgroundColor: "#FFA114",
                      color: "white",
                      border: "none",
                      borderRadius: "20px",
                    }}
                    onClick={() => handleButtonClick("white")}
                  >
                    Beaver
                  </button>
                  <button
                    style={{
                      padding: "8px 25px",
                      fontSize: "20px",
                      fontWeight: "600",
                      backgroundColor: "#FFA114",
                      color: "white",
                      border: "none",
                      borderRadius: "20px",
                    }}
                    onClick={() => handleButtonClick("black")}
                  >
                    Black
                  </button>
                </div>

                <div className="mb-3 mt-5">
                  <h2 className="mb-3">Choose Prodcut Size</h2>

                  {/* <button onClick={() => handleSizeChange("small")}>
                                  Small
                                </button> */}

                  <div className="color-btn">
                    <button
                      style={{
                        padding: "8px 25px",
                        fontSize: "20px",
                        fontWeight: "600",
                        backgroundColor: "#FFA114",
                        color: "white",
                        border: "none",
                        borderRadius: "20px",
                      }}
                      onClick={() => handleSizeChange("Small")}
                    >
                      Small
                    </button>
                    <button
                      style={{
                        padding: "8px 25px",
                        fontSize: "20px",
                        fontWeight: "600",
                        backgroundColor: "#FFA114",
                        color: "white",
                        border: "none",
                        borderRadius: "20px",
                      }}
                      onClick={() => handleSizeChange("Medium")}
                    >
                      Medium
                    </button>
                  </div>

                  <h4 className="mt-3">
                    <span>Selected Size:</span> {selectedSize}
                  </h4>
                </div>
              </div>
            </div>
          ) : (
            <h2 className="text-center">No products found</h2>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
