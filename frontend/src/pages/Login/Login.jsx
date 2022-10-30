import "./Login.scss";
import Signup from "../../components/LoginPageComponents/Signup/Signup";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading";

const Login = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 750);
  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="login">
      <Signup />
    </div>
  )
}

export default Login;