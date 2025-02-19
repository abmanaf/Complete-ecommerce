import React, {useState} from "react";
import Imageurl from "../../atoms/Photoss/Photo";
import "./Shop.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../atoms/button/Button";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../state/slices/cartSlice";
import Navbar from "../../molecules/NavBar/NavBar";

const Shop = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const cartItems = useSelector((state) => state.cart.items);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = products.filter((product) => {
    return selectedCategory === "all" || product.category === selectedCategory;
  });

  const handleAddToCart = (productId) => {
    const product = products.find((product) => product.id === productId);
    const cartItem = cartItems.find((item) => item.id === productId);
    if (cartItem && cartItem.count >= product.availableProduct) {
      toast.error(`${product.name} is out of stock!`);
      return
    } 
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
    
  };

  const productList = filteredProducts.map((product) => (
    <div key={product.id} className="product-container">
      <li>
        <div className="sub-product-container">
          <img src={Imageurl(product)} alt={product.id} />
          <br />
          {product.name} <br />
          <del>{product.previousPrice ? `₵${product.previousPrice}` : ""}</del> &cent;{product.price}
          <br />
          <br />
          <div className="add_to_cart">
            <Button onClick={() => handleAddToCart(product.id)}>Add To Cart</Button>
          </div>
        </div>
      </li>
    </div>
  ));

  return (
    <div>
      <Navbar />
      <div className="shop-page-container">
        <p className="text-category">Category</p>
        <div className="category-container">
          <div className="filter-button" code="categoryFilter">
            <Button
              className={`feature-all ${selectedCategory === "all" ? "active" : ""}`}
              onClick={() => setSelectedCategory("all")}
            >
              <i className="fa fa-globe" aria-hidden="true"></i>
              All
            </Button>
            <Button
              className={`feature-fruits ${selectedCategory === "fruits" ? "active" : ""}`}
              onClick={() => setSelectedCategory("fruits")}
            >
              <i className="fa fa-weibo" aria-hidden="true"></i>
              Fruits
            </Button>
            <Button
              className={`feature-vegetables ${selectedCategory === "vegetables" ? "active" : ""}`}
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