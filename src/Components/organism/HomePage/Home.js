import React, { useEffect, useState } from "react";
import Imageurl from "../../atoms/Photoss/Photo";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./Home.css";
import Button from "../../atoms/button/Button";
import Image from "../../atoms/Image";
import backgound_img from "./background-image.webp";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../state/slices/cartSlice";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const cartItems = useSelector((state) => state.cart.items);

  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // eslint-disable-next-line
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
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

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "all") {
      return true;
    } else {
      return product.category === selectedCategory;
    }
  });

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
    }
  }, [location.state]);

  const handleAddToCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    const cartItem = cartItems.find((item) => item.id === productId);

    if (cartItem && cartItem.count >= product.availableProduct) {
      toast.error(`${product.name} is exhusted`);
      return;
    }

    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
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
          <div className="add_to_cart">
            <Button onClick={() => handleAddToCart(product.id)}>
              Add To Cart
            </Button>
          </div>
        </div>
      </li>
    </div>
  ));

  const healthyFruits = products
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
                onClick={() => handleAddToCart(item.id)}
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
};

export default Home;
