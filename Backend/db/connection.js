const mongoose = require("mongoose");

// const URL_local = "mongodb://127.0.0.1:27017/breweryDB";

const URL_cloud =
  "mongodb+srv://admin-chintu:Ek69bP9p7iwtRJO1@cluster0.zaseysf.mongodb.net/breweryDB?retryWrites=true&w=majority";

const connect = async () => {
  await mongoose.connect(URL_cloud);
};

module.exports = connect;
