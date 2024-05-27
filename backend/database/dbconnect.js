const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbconnect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("connected with database ...!! 🎉");
  } catch (error) {
    console.log("something went wrong..." + error);
  }
};
module.exports = dbconnect;
// {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }