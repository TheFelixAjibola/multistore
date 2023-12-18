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
  req.user
    .createProduct({
      title: title,
      price: price,
      imageURL: imageURL,
      description: description,
    })
    .then(() => {
      console.log("Created Product");
      res.redirect("/admin/list");
    })
    .catch((err) => console.log(err));
};

const getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const id = req.params.id;
  req.user
    .getProducts({ where: { id: id } })
    // Product.findByPk(id)
    .then((products) => {
      const product = products[0];
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit", {
        pageTitle: "Edit Product",
        path: "/admin/edit",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

const postEditProduct = (req, res, next) => {
  const id = req.body.id;
  const updatedTitle = req.body.title;
  const updatedImageURL = req.body.imageURL;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  Product.findByPk(id)
    .then((product) => {
      product.title = updatedTitle;
      product.imageURL = updatedImageURL;
      product.price = updatedPrice;
      product.description = updatedDescription;
      return product.save();
    })
    .then((result) => {
      console.log("Product has been updated!");
      res.redirect("/admin/list");
    })
    .catch((err) => console.log(err));
};

const getList = (req, res, next) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/list", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/list",
      });
    })
    .catch((err) => console.log(err));
};

const postDeleteProduct = (req, res, next) => {
  const id = req.body.id;
  Product.findByPk(id)
    .then((product) => {
      return product.destroy();
    })
    .then(() => {
      console.log("Product has been deleted!");
      res.redirect("/admin/list");
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  getList,
  postDeleteProduct,
};
