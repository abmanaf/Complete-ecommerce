import React, { useState } from "react";
import Imageurl from "../Photoss/Photo";
import { initialProducts } from "../Data_base/Database";
import Toast from "../Toaste/Toast";
import toast, { Toaster } from "react-hot-toast";
import "./Shop.css";

const Shop = ({ cart, setCart, updateCartCount }) => {
  const [products, setProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const filteredProducts = initialProducts.filter((product) => {
    return selectedCategory === "all" || product.category === selectedCategory;
  });

  const addToCart = (productId) => {
    const product = products.find((product) => product.id === productId);
    if (product) {
      if (product.availableProduct > 0) {
        const productInCart = cart.find((item) => item.id === productId);
        if (!productInCart) {
          setSelectedProductIds((prevSelected) => {
            if (!prevSelected.includes(productId)) {
              return [...prevSelected, productId];
            }
            return prevSelected;
          });

          toast.success(<Toast message={`${product.name} added to cart!`} />);

          const updatedProducts = products.map((product) => {
            if (product.id === productId) {
              return {
                ...product,
                count: Number(product.count) + 1,
              };
            }
            return product;
          });

          setProducts(updatedProducts);
          updateCartCount(calculateTotalCount(updatedProducts));

          const updatedCart = updatedProducts.filter(
            (product) => product.count > 0
          );
          setCart(updatedCart);
        } else {
          toast.error(
            <Toast message={`${product.name} is already in the cart!`} />
          );
        }
      } else {
        toast.error(<Toast message={`${product.name} is out of stock!`} />);
      }
    }
  };

  const calculateTotalCount = (cart) => {
    return cart.reduce((count, product) => count + product.count, 0);
  };

  const productList = filteredProducts.map((product) => (
    <div
      key={product.id}
      className="product-container"
      style={{ marginBottom: "2em", position: "relative" }}
    >
      <li
        className={`list ${
          selectedProductIds.includes(product.id) ? "border" : ""
        }`}
      >
        <div
          className="sub-product-container"
          style={{
            position: "relative",
            flexDirection: "column",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={Imageurl(product)} alt={product.id} />
          <br />
          {product.name} <br />
          <del style={{ color: "red" }}>
            {product.previousPrice ? `₵${product.previousPrice}` : ""}
          </del>{" "}
          &cent;{product.price}
          <br />
          <br />
          <div className="addToCart">
            <button onClick={() => addToCart(product.id)}>Add To Cart</button>
          </div>
        </div>
      </li>
    </div>
  ));

  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
          style: {
            background: "var(--Grey-darker)",
            color: "#fff",
          },
        }}
      />
      <div style={{ backgroundColor: "white", padding: "3em 3em" }}>
        <p style={{ textAlign: "center", fontSize: "2em", padding: "1em" }}>
          Category
        </p>
        <div className="category-container">
          <div className="filter-button" code="categoryFilter">
            <button
              style={{ borderRadius: "10px" }}
              className={selectedCategory === "all" ? "active" : ""}
              onClick={() => setSelectedCategory("all")}
            >
              <i
                style={{
                  fontSize: "30px",
                  padding: "10px 20px",
                  color: "white",
                }}
                className="fa fa-globe"
                aria-hidden="true"
              ></i>
              <br />
              All
            </button>
            <button
              style={{ borderRadius: "10px" }}
              className={selectedCategory === "fruits" ? "active" : ""}
              onClick={() => setSelectedCategory("fruits")}
            >
              <i
                style={{
                  fontSize: "30px",
                  padding: "10px 20px",
                  color: "white",
                }}
                className="fa fa-weibo"
                aria-hidden="true"
              ></i>
              <br />
              Fruits
            </button>
            <button
              style={{ borderRadius: "10px" }}
              className={selectedCategory === "vegetables" ? "active" : ""}
              onClick={() => setSelectedCategory("vegetables")}
            >
              <i
                style={{
                  fontSize: "30px",
                  padding: "10px 20px",
                  color: "white",
                }}
                className="fa fa-cutlery"
                aria-hidden="true"
              ></i>
              <br />
              Vegetables
            </button>
          </div>
        </div>
      </div>
      <div className="available-product-container">
        <div style={{ marginTop: "4em", textAlign: "center" }}>
          <div
            className="product-in-container"
            style={{ justifyContent: "center", textAlignLast: "center" }}
          >
            {productList}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
