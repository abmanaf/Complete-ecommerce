import React from "react";
import Imageurl from "../../Components/atoms/Photoss/Photo";
import { initialProducts } from "../../Data/Database";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import Toast from "../../Components/atoms/Toaste/Toast";
import toast, { Toaster } from "react-hot-toast";
import "./Home.css";

function Home({ cart, setCart, updateCartCount }) {
  const [products, setProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const navigate = useNavigate();

  const fruitContainerRef = useRef(null);

  const scrollLeft = () => {
    if (fruitContainerRef.current) {
      fruitContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (fruitContainerRef.current) {
      fruitContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const filteredProducts = initialProducts.filter((product) => {
    if (selectedCategory === "all") {
      return true;
    } else {
      return product.category === selectedCategory;
    }
  });

  const addToCart = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        if (product.availableProduct > 0) {
          const productInCart = cart
            ? cart.find((item) => item.id === productId)
            : null;

          if (!productInCart) {
            setSelectedProductIds((prevSelected) => {
              if (!prevSelected.includes(productId)) {
                return [...prevSelected, productId];
              }
              return prevSelected;
            });
            toast.success(<Toast message={`${product.name} added to cart`} />);
            return {
              ...product,
              count: Number(product.count) + 1,
            };
          } else {
            /*
            alert(
              `${product.name} is already in the cart, visit the cart to increase the product quantity`
            );
            */
            toast.error(
              <Toast message={`${product.name} is already in the cart`} />
            );
          }
        } else {
          //alert(`${product.name} is out of stock`);
          toast.error(<Toast message={`${product.name} is out of stock`} />);
        }
      }
      return product;
    });

    setProducts(updatedProducts);

    const totalCount = calculateTotalCount(updatedProducts);
    updateCartCount(totalCount);

    const updatedCart = updatedProducts.filter((product) => product.count > 0);
    setCart(updatedCart);
  };

  const calculateTotalCount = (cart) => {
    return cart.reduce((count, product) => count + product.count, 0);
  };

  const productList = filteredProducts.map((product, index) => (
    <div
      className="product-container"
      key={product.id}
      style={{ marginBottom: "2em", position: "relative" }}
    >
      <li
        className={`list  ${
          selectedProductIds.includes(product.id) ? "border" : ""
        }`}
      >
        <div className="sub-product-container">
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

  const healthyFruits = initialProducts
    .filter((item) => item.category === "fruits")
    .map((item) => (
      <div className="fruit-container" key={item.id}>
        <li>
          <div className="sub-fruit-container">
            <img src={Imageurl(item)} alt={item.id} />
            <br />
            {item.name} <br />
            <del style={{ color: "red" }}>
              {item.previousPrice ? `₵${item.previousPrice}` : ""}
            </del>{" "}
            &cent;{item.price}
            <br />
            <br />
            <div className="fruit-addToCart">
              <button
                onClick={() => addToCart(item.id)}
                style={{ color: "black" }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </li>
      </div>
    ));

  const haddleOrder = () => {
    navigate("/Shop");
  };

  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
          style: {
            background: "var(--Grey-darker)",
            color: "#fff",
          },
        }}
      />
      <div className="site-description">
        <div className="left-site-description">
          <p className="welcome-message">
            <strong>Welcome to AlibabShop</strong>
          </p>
          <div className="title-order">
            <p className="title">
              Explore our latest collection of <i>HEALTHY FOODS </i>
              Enjoy exclusive deals, and elevate your activity with AlibabsShop.
            </p>
            <button
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                backgroundColor: "#e5c827",
                border: "none",
                cursor: "pointer",
                marginTop: "2em",
                color: "black",
              }}
              onClick={() => haddleOrder()}
            >
              Shop Now
            </button>
          </div>
        </div>
        <div class="main-container">
          <img
            src="https://i0.wp.com/www.beyondborders254.com/wp-content/uploads/2018/03/Fruits-and-vegetables.jpg?fit=960%2C540&ssl=1"
            alt=""
          />
        </div>
      </div>
      <div className="featured-category" style={{ padding: "3em 1em" }}>
        <div style={{ textAlign: "start" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ textAlign: "start", fontSize: "25px" }}>
              {" "}
              <strong>Healthy Fruits:</strong>
            </div>
            <div className="scroll-button">
              <button
                className="scroll-left-right"
                style={{ color: "black" }}
                onClick={scrollLeft}
              >
                &lt;{" "}
              </button>
              <button
                className="scroll-left-right"
                style={{ color: "black" }}
                onClick={scrollRight}
              >
                {" "}
                &gt;
              </button>
            </div>
          </div>
          <div className="fruit-in-container" ref={fruitContainerRef}>
            {healthyFruits}
          </div>
        </div>
      </div>
      <div>
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
                    fontSize: "30px ",
                    padding: "10px 20px",
                    color: "white",
                  }}
                  className="fa fa-globe"
                  aria-hidden="true"
                ></i>{" "}
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
                    fontSize: "30px ",
                    padding: "10px 20px",
                    color: "white",
                  }}
                  class="fa fa-weibo"
                  aria-hidden="true"
                ></i>{" "}
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
                    fontSize: "30px ",
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
          <div style={{ marginTop: "3em", textAlign: "center" }}>
            {/* 
          <div className="sort-container" style={{ marginTop: "2em" }}>
            <label
              htmlFor="categoryFilter"
              style={{ fontSize: "1em", marginTop: "3em" }}
            >
              Select Category:
            </label>
             
            <select
              style={{
                fontSize: "1em",
                marginBottom: "2em",
                padding: "0.3em 0.3em",
              }}
              code="categoryFilter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All</option>
              <option value="fruits">Fruits</option>
              <option value="vegetables">Vegetables</option>
            </select>
          </div>
          */}

            <div
              className="product-in-container"
              style={{
                justifyContent: "center",
                alignItems: "center",
                textAlignLast: "center",
              }}
            >
              {productList}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
