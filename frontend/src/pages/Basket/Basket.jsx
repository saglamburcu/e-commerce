import MyBasket from "../../components/BasketPageComponents/MyBasket/MyBasket"

const Basket = () => {
  return (
    <MyBasket url={"/checkout/shipping-address"} buttonText={"Sepeti Onayla"} showBtn={true}/>
  )
}

export default Basket;