import axios from "axios";
import logo from "../components/assets/logo4.jpg";

export const checkoutHandler = async (amount) => {
  const {
    data: { key },
  } = await axios.get("http://localhost:4000/api/v1/getkey");

  const {
    data: { order },
  } = await axios.post("http://localhost:4000/api/v1/checkout", { amount });

  const options = {
    key,
    amount: order.amount,
    c: "INR",
    name: "URBAN NEST",
    description: "payments page",
    image: logo,
    order_id: order.id,
    callback_url: "http://localhost:4000/api/v1/verification",
    prefill: {
      name: "y",
      email: "urbannest@support.com",
      contact: "1800-321-456",
    },
    notes: {
      address: "Jalpaiguri, WB",
    },
    theme: {
      color: "#121212",
    },
  };
  const razor = new window.Razorpay(options);
  return razor.open();
};
