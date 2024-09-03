import React from "react";

function Try() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <span className="table-sell-style">
              <img src={Imageurl(product)} alt={product.id} />
            </span>
          </div>
          <div>
            <span className="table-sell-style">{product.name}</span>{" "}
            <span>Price</span>
            <span>SubTotal</span>
            <span>Quantity</span>
          </div>
        </div>
        <div>
          <span className="table-sell-style">
            <button
              onClick={() => removeFromCart(product.id)}
              className="action-button-style"
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </span>
          <br />
          <br />
          <div>
            <span className="price-style">{product.price}</span>
          </div>
          <br />
          <div>
            <span className="price-style">
              {(product.count * parseFloat(product.price)).toFixed(2)}
            </span>
            <br />
            <br />
          </div>
          <div>
            <div style={{ marginTop: "1px" }}></div>
            <div>
              <span
                style={{
                  textAlign: "center",
                  marginLeft: "6em",
                }}
              >
                <div className="cart-border">
                  <Link
                    onClick={() => reduceQuantity(product.id)}
                    className="quantity-button-decrease"
                    style={{
                      marginRight: "10px",
                      textDecoration: "none",
                    }}
                  >
                    -
                  </Link>
                  {product.count}
                  <Link
                    onClick={() => increaseQuantity(product.id)}
                    className="quantity-button-increase"
                    style={{
                      marginLeft: "10px",
                      textDecoration: "none",
                    }}
                  >
                    +
                  </Link>
                </div>
              </span>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}

export default Try;
