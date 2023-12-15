const Product = require("../models/products");

const getAddProduct = (req, res, next) => {
  res.render("admin/edit", {
    pageTitle: "Add Product",
    path: "/admin/add",
    editing: false,
  });
};

const postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageURL = req.body.imageURL;
  const price = req.body.price;
  const description = req.body.description;
  const products = new Product(null, title, imageURL, description, price);
  products
    .save()
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
};

const getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const id = req.params.id;
  Product.findById(id, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit", {
      pageTitle: "Edit Product",
      path: "/admin/edit",
      editing: editMode,
      product: product,
    });
  });
};

const postEditProduct = (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const imageURL = req.body.imageURL;
  const price = req.body.price;
  const description = req.body.description;
  const updatedProduct = new Product(id, title, imageURL, description, price);
  updatedProduct.save();
  res.redirect("/admin/list");
};

const getList = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("admin/list", {
        prods: rows,
        pageTitle: "Admin Products",
        path: "/admin/list",
      });
    })
    .catch((err) => console.log(err));
};

const postDeleteProduct = (req, res, next) => {
  const id = req.body.id;
  Product.deleteById(id);
  res.redirect("/admin/list");
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  getList,
  postDeleteProduct,
};
