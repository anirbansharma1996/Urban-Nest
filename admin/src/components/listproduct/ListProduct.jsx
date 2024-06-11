import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInfo = async () => {
    try {
      const res = await fetch("https://urban-nest-backend-v1.onrender.com/api/v1/allproducts");
      const data = await res.json();
      setAllProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchInfo();
  }, []);


  const removeProduct = async (id) => {
    await fetch(
      "https://urban-nest-backend-v1.onrender.com/api/v1/removeproduct",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      }
    );

    fetch("https://urban-nest-backend-v1.onrender.com/api/v1/allproducts")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };

  return (
    <div className="listproduct">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        {loading &&  <h3>Loading ... </h3> }
        <hr />
        {!loading && allproducts.map((e) => {
          return (
            <div>
              <div className="listproduct-format-main listproduct-format">
                <img
                  className="listproduct-product-icon"
                  src={e.image}
                  alt=""
                />
                <p cartitems-product-title>{e.name}</p>
                <p>₹{e.old_price}</p>
                <p>₹{e.new_price}</p>
                <p>{e.category}</p>
                <img
                  className="listproduct-remove-icon"
                  onClick={() => {
                    removeProduct(e.id);
                  }}
                  src={cross_icon}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
