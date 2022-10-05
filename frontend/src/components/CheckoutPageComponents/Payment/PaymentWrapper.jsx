
// import Payment from "./Payment";
// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';
// import { useEffect, useState } from "react";
// import axios from "axios";

// const PaymentWrapper = () => {
//   // const [stripeApiKey, setStripeApiKey] = useState("");

//   // async function getStripe() {
//   //   const { data } = await axios.get("http://localhost:4000/api/stripeapikey");

//   //   setStripeApiKey(data.stripeApiKey);
//   // }

//   // useEffect(() => {
//   //   getStripeApiKey();
//   // }, [])

//   let stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_API_KEY}`)

//   return (
//    <>
   
//         <Elements stripe={stripePromise}>
//       <Payment />
//     </Elements>
     
//    </>
//   )
// }

// export default PaymentWrapper;