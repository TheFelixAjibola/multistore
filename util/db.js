const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect()
    .then()
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;
