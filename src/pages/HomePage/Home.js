import React from "react";
import Imageurl from "../../Components/atoms/Photoss/Photo";
import { initialProducts } from "../../Data/Database";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./Home.css";
import Button from "../../Components/atoms/button/Button";
import Image from "../../Components/atoms/Image";
import backgound_img from "./background-image.webp";

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
            toast.success(`${product.name} added to cart`);
            return {
              ...product,
              count: Number(product.count) + 1,
            };
          } else {
            toast.error(`${product.name} is already in the cart`);
          }
        } else {
          toast.error(`${product.name} is out of stock`);
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
    <div className="product-container" key={product.id}>
      <li
        className={`list  ${
          selectedProductIds.includes(product.id) ? "border" : ""
        }`}
      >
        <div className="sub-product-container">
          <img src={Imageurl(product)} alt={product.id} />
          <br />
          {product.name} <br />
          <del>
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
            <Image src={Imageurl(item)} alt={item.id} />
            {item.name} <br />
            <del>{item.previousPrice ? `₵${item.previousPrice}` : ""}</del>
            &cent;{item.price}
            <div className="fruit-addToCart">
              <Button
                className="add-to-cart"
                onClick={() => addToCart(item.id)}
              >
                Add To Cart
              </Button>
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
      <div className="site-description">
        <div className="left-site-description">
          <p className="welcome-message">
            <strong>Welcome to AlibabShop</strong>
          </p>
          <div className="title-order">
            <p className="title">
              Explore our latest collection of <strong>HEALTHY FOODS </strong>
              Enjoy exclusive deals, and elevate your activity with AlibabsShop.
            </p>

            <Button onClick={() => haddleOrder()} className="show-now-button">
              Shop Now
            </Button>
          </div>
        </div>
        <div class="main-container">
          <Image
            src={backgound_img}
            alt="background image"
            className="backgound-img"
          />
        </div>
      </div>
      <div className="featured-category">
        <div className="fruits-only-container">
          <div className="title-nav">
            <div className="fruits-title">
              <strong>Healthy Fruits:</strong>
            </div>
            <div className="scroll-button">
              <Button className="scroll-button" onClick={scrollLeft}>
                &lt;
              </Button>
              <Button className="scroll-button" onClick={scrollRight}>
                &gt;
              </Button>
            </div>
          </div>
          <div className="fruit-in-container" ref={fruitContainerRef}>
            {healthyFruits}
          </div>
        </div>
      </div>
      <div>
        <div className="category">
          <p className="category-text">Category</p>
          <div className="category-container">
            <div className="filter-button" code="categoryFilter">
              <Button
                className={`feature-all ${
                  selectedCategory === "all" ? "active" : ""
                }`}
                onClick={() => setSelectedCategory("all")}
              >
                <i className="fa fa-globe" aria-hidden="true"></i>
                All
              </Button>
              <Button
                className={`feature-fruits ${
                  selectedCategory === "fruits" ? "active" : ""
                }`}
                onClick={() => setSelectedCategory("fruits")}
              >
                <i class="fa fa-weibo" aria-hidden="true"></i>
                Fruits
              </Button>
              <Button
                className={`feature-vegetables ${
                  selectedCategory === "vegetables" ? "active" : ""
                }`}
                onClick={() => setSelectedCategory("vegetables")}
              >
                <i className="fa fa-cutlery" aria-hidden="true"></i>
                Vegetables
              </Button>
            </div>
          </div>
        </div>
        <div className="available-product-container">
          <div className="sub-available-product-container">
            <div className="product-in-container">{productList}</div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
