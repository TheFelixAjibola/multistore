const Product = require("../models/products");
const Cart = require("../models/cart");

const getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "My Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

const getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/list", {
      prods: products,
      pageTitle: "Shop Products",
      path: "/list",
    });
  });
};

const getProductDetails = (req, res, next) => {
  const id = req.params.id;
  Product.findById(id, (product) => {
    res.render("shop/details", {
      product: product,
      path: "/list",
      pageTitle: product.title,
    });
  });
};

const getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "My Cart",
  });
};

const postCart = (req, res, next) => {
  const id = req.body.id;
  Product.findById(id, (product) => {
    Cart.addProduct(id, product.price);
  });
  res.redirect("/cart");
};

const getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "My Orders",
  });
};

const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

module.exports = {
  getIndex,
  getProducts,
  getProductDetails,
  getCart,
  postCart,
  getOrders,
  getCheckout,
};
