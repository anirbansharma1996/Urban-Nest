const Product = require("../model/product.model.js");

const Addproducts = async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const newProduct = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  await newProduct.save();
  return res.json({
    success: true,
    name: req.body.name,
  });
};

//Creating API For deleting Products

const Removeproduct = async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({
    success: true,
    name: req.body.name,
  });
};

//Creating API for getting all products

const Allproducts = async (req, res) => {
  let products = await Product.find({});
  res.send(products);
};

//creating endpoint for newcollection data

const Newcollection = async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  res.send(newcollection);
};
//creating endpoint for popular in women section
const PopularinWoman = async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.splice(0, 4);
  res.send(popular_in_women);
};

module.exports = {
  PopularinWoman,
  Newcollection,
  Allproducts,
  Removeproduct,
  Addproducts,
};
