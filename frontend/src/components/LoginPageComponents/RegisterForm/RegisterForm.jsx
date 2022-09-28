import "./RegisterForm.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUnlockKeyhole, faFaceSmile} from "@fortawesome/free-solid-svg-icons";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons"
import { useState, useContext } from "react";
import { fetchRegisterUser } from "../../../api";
import { UserContext } from "../../../context/UserContext";
import Error from "../../Error/Error";
import { useNavigate } from "react-router-dom";
import {useFormik} from "formik";
import validations from "../../../validations";

const RegisterForm = () => {
  const {login} = useContext(UserContext);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {

    try {
      const response = await fetchRegisterUser(values.name, values.email, values.password);
    
      if (!response.success) {
        setIsError(true);
        
        setTimeout(() => {
          setIsError(false);
        }, 4000);

        return;
      }

      login(response)
      navigate("/", {replace: true});

    } catch (err) {
      console.log(err);
    }
  }

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
        },
    onSubmit: handleRegister, 
    validationSchema: validations,
  })

  return (
    <form className="registerform" onSubmit={handleSubmit}>

      {isError && (
        <Error 
          message="Bu mail adresi daha önce kullanıldı. Lütfen başka bir mail adresiyle kayıt olmayı deneyiniz."/>
      )}

      <div className="registerform__name">
        <div className="registerform__name__value">
          <span className="registerform__name__value__icon">
            <FontAwesomeIcon icon={faFaceSmile} />
          </span>
          <input 
            className="registerform__name__value__input" 
            type="text" 
            placeholder="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        {errors.name && touched.name && <div className="registerform__name__error">{errors.name}</div>}
      </div>

      <div className="registerform__email">
        <div className="registerform__email__value">
            <span className="registerform__email__value__icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input 
              className="registerform__email__value__input"
              type="email" 
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
        </div>

        {errors.email && touched.email && <div className="registerform__email__error">{errors.email}</div>}      
      </div>

      <div className="registerform__password">
        <div className="registerform__password__value">
          <span className="registerform__password__value__icon">
            <FontAwesomeIcon icon={faUnlockKeyhole} />
          </span>
          <input 
            className="registerform__password__value__input" 
            type="password" 
            placeholder="Password" 
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        {errors.password && touched.password && <div className="registerform__password__error">{errors.password}</div>}
      </div>
      
      <button className="registerform__button" type="submit">Register</button>
    </form>
  )
}

export default RegisterForm;