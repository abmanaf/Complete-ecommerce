import React, { useState } from "react";
import Imageurl from "../../atoms/Photoss/Photo";
import { initialProducts } from "../../../Data/Database";
import "./Shop.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../atoms/button/Button";

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

          toast.success(`${product.name} added to cart!`);

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
          toast.error(`${product.name} is already in the cart!`);
        }
      } else {
        toast.error(`${product.name} is out of stock!`);
      }
    }
  };

  const calculateTotalCount = (cart) => {
    return cart.reduce((count, product) => count + product.count, 0);
  };

  const productList = filteredProducts.map((product) => (
    <div key={product.id} className="product-container">
      <li
        className={`list ${
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
            <Button onClick={() => addToCart(product.id)}>Add To Cart</Button>
          </div>
        </div>
      </li>
    </div>
  ));

  return (
    <div>
      <div className="shop-page-container">
        <p className="text-category">Category</p>
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
              <i className="fa fa-weibo" aria-hidden="true"></i>
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
        <div className="all-products-in-shop">
          <div className="product-in-container">{productList}</div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Shop;
