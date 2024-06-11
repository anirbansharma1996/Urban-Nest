import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });
  const [error, setError] = useState(null);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const maxSize = 16 * 1024;

    if (file.size > maxSize) {
      setError("Image size must be equal or less than 16KB");
      openModal();
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProductDetails({ ...productDetails, image: reader.result });
    };
    reader.onerror = (error) => {
      console.log(error);
    };
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
 
  const Add_Product = async () => {
    setError(null);
    try {
      const uploadResponse = await fetch(
        "https://urban-nest-backend-v1.onrender.com/api/v1/addproduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productDetails),
        }
      );
 
      if (!uploadResponse.ok) {
        throw new Error(`Upload failed! Status: ${uploadResponse.status}`);
      }else{
        alert("Product Added Successfully")
        setProductDetails({
          name: "",
          image: "",
          category: "women",
          new_price: "",
          old_price: "",
        })
      }
    } catch (err) {
      console.error("Failed to add product:", err);
      setError(err.message);
    }
  };

  return (
    <div className="add-product">
      {error && <div className="error-message">Error: {error}</div>}
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type Here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type Here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type Here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <br />
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={productDetails.image || upload_area}
            className="addproduct-thumbnail-img"
            alt=""
            width={"300px"}
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button onClick={Add_Product} className="addproduct-btn">
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
