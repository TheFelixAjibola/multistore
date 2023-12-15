const Product = require("../models/products");
const Cart = require("../models/cart");

const getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "My Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

const getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/list", {
        prods: rows,
        pageTitle: "Shop Products",
        path: "/list",
      });
    })
    .catch((err) => console.log(err));
};

const getProductDetails = (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .then(([product]) => {
      res.render("shop/details", {
        product: product[0],
        path: "/list",
        pageTitle: product[0].title,
      });
    })
    .catch((err) => console.log(err));
};

const getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];

      for (product of products) {
        const cardProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cardProductData) {
          cartProducts.push({ productData: product, qty: cardProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "My Cart",
        products: cartProducts,
      });
    });
  });
};

const postCart = (req, res, next) => {
  const id = req.body.id;
  Product.findById(id, (product) => {
    Cart.addProduct(id, product.price);
  });
  res.redirect("/cart");
};

const postCartDeleteProduct = (req, res, next) => {
  const id = req.body.id;
  Product.findById(id, (product) => {
    Cart.deleteProduct(id, product.price);
    res.redirect("/cart");
  });
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
  postCartDeleteProduct,
  getOrders,
  getCheckout,
};
