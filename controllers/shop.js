const Product = require("../models/products");
const Cart = require("../models/cart");

const getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "My Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

const getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/list", {
        prods: products,
        pageTitle: "Shop Products",
        path: "/list",
      });
    })
    .catch((err) => console.log(err));
};

const getProductDetails = (req, res, next) => {
  const id = req.params.id;
  Product.findAll({ where: { id: id } })
    .then((product) => {
      res.render("shop/details", {
        product: product[0],
        path: "/list",
        pageTitle: product[0].title,
      });
    })
    .catch((err) => console.log(err));
};

const getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          res.render("shop/cart", {
            path: "/cart",
            pageTitle: "My Cart",
            products: products,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

const postCart = (req, res, next) => {
  const id = req.body.id;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: id } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }

      return Product.findByPk(id);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
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
