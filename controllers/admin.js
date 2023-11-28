const Product = require("../models/products");

const getAddProduct = (req, res, next) => {
  res.render("admin/edit", {
    pageTitle: "Add Product",
    path: "/admin/add",
  });
};

const postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageURL = req.body.imageURL;
  const price = req.body.price;
  const description = req.body.description;
  const products = new Product(title, imageURL, description, price);
  products.save();
  res.redirect("/");
};

const getList = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/list", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/list",
    });
  });
};

module.exports = { getAddProduct, getList, postAddProduct };
