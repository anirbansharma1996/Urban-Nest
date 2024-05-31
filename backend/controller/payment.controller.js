const dotenv = require("dotenv");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const payment = require("../model/payment.model.js");

dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY_ID,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).send(error);
  }
};

const paymentVarification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const secret_body = razorpay_order_id + "|" + razorpay_payment_id;

    const expected_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(secret_body.toString())
      .digest("hex");

    const isAuth = expected_signature === razorpay_signature;
    if (isAuth) {
      await payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
    }
    res.redirect(`http://localhost:5174`);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { checkout, paymentVarification };
