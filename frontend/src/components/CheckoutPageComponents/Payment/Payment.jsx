// import {
//   CardNumberElement,
//   CardCvcElement,
//   CardExpiryElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { useRef } from "react";

// const Payment = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const payBtn = useRef(null);

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       const { data } = await axios.post(
//         "http://localhost:4000/api/payment/process",
//         {amount: Math.round(5 * 100)},  //?
//         config
//       );

//       const client_secret = data.client_secret;

//       if (!stripe || !elements) return;

//       const result = await stripe.confirmCardPayment(client_secret, {
//         payment_method: {
//           card: elements.getElement(CardNumberElement),
//           billing_details: {
//             name: "Burcu",
//             email: "burcu@gmail.com",
//             address: {
//               line1: "shippingInfo.address",
//               city: "shippingInfo.city",
//               state: "shippingInfo.state",
//               country: "shippingInfo.country",
//             },
//           },
//         },
//       });

//       if (!result.error) {
//         console.log("Successfull payment")
//       }

//     } catch (err) {
//       console.log(err.response.data.message)
//     }
//   }

//   return (
//     <>
//       <div className="paymentContainer">
//         <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
//           <h1>Card Info</h1>
//           <div>
//             <CardNumberElement className="paymentInput" />
//           </div>
//           <div>
//             <CardExpiryElement className="paymentInput" />
//           </div>
//           <div>
//             <CardCvcElement className="paymentInput" />
//           </div>

//           <input
//             type="submit"
//             value={`Pay - $ ${100}`}
//             ref={payBtn}
//             className="paymentFormBtn"
//           />
//         </form>
//       </div>
//     </>
//   )
// }

// export default Payment;