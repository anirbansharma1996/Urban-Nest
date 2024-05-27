import React, { useState } from "react";
import "./NewCollections.css";
import Item from "../../item/Item";
import { useEffect } from "react";

const NewCollections = () => {
  const [new_collection, setNew_Collection] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:4000/api/v1/newcollections")
      .then((response) => response.json())
      .then((data) => setNew_Collection(data));
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollections;
