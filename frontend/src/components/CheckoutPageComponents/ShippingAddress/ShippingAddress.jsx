import "./ShippingAddress.scss";
import { Link, useNavigate} from "react-router-dom";
import { Country, State, City }  from 'country-state-city';
import { useState, useEffect, useContext} from "react";
import { OrderContext } from "../../../context/OrderContext";

const ShippingAddress = () => {
  const [countryCodeValue, setCountryCodeValue] = useState("");
  const [stateCodeValue, setStateCodeValue] = useState("");
  const [cityCodeValue, setCityCodeValue] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);

  const [isShowState, setIsShowState] = useState(false);
  const [isShowCity, setIsShowCity] = useState(false);

  const {setAddressData} = useContext(OrderContext);

  const navigate = useNavigate();

  useEffect(() => {
    const stateList = State.getStatesOfCountry(`${countryCodeValue}`);
    setState(stateList);

    const cityList = City.getCitiesOfState(`${countryCodeValue}`, `${stateCodeValue}`);
    setCity(cityList);  
  }, [countryCodeValue, stateCodeValue]);

  const handleChangeCountry = (e) => {
    setCountryCodeValue(e.target.value);
    setIsShowState(true);
  };

  const handleChangeState = (e) => {
    setStateCodeValue(e.target.value);
    setIsShowCity(true);
  }

  const handleChangeCity = (e) => {
    setCityCodeValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      address: address,
      city: cityCodeValue,
      state: stateCodeValue,
      country: countryCodeValue,
      phoneNo: phone
    }
    setAddressData(data);

    navigate("/checkout/order-confirm")
  }

  return (
    <div className="address">
      <form className="address__form" onSubmit={handleSubmit}>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Telefon" />

        <select onChange={handleChangeCountry}>
          <option value="">Ülke</option>
          {
            Country.getAllCountries().map((country, index) => (
              <option key={index} value={country.isoCode}>{country.name}</option>
            ))
          }
        </select>

        <select onChange={handleChangeState} {...(!isShowState && {disabled: "disabled"})}>
          <option value="">İl</option>
            {
              state.map((stateItem, index) => (
                <option key={index} value={stateItem.isoCode}>{stateItem.name}</option>
              ))
            }
        </select>

        <select onChange={handleChangeCity} {...(!isShowCity && {disabled: "disabled"})}>
          <option value="">İlçe</option>
            {
              city.map((cityItem, index) => (
                <option key={index} value={cityItem.name}>{cityItem.name}</option>
              ))
            }
        </select> 

        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Adres" />

          <button type="submit">Siparişi Onayla</button>
   
    </form>
    </div>
  )  
}

export default ShippingAddress;