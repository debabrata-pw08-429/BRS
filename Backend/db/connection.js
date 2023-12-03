const mongoose = require("mongoose");

const connect = async () => {
  // const URL_cloud =
  //   "mongodb+srv://admin-chintu:Ek69bP9p7iwtRJO1@cluster0.xnafzup.mongodb.net/?retryWrites=true&w=majority";

  const URL_local = "mongodb://127.0.0.1:27017/breweryDB";
  await mongoose.connect(URL_local);
};

module.exports = connect;
