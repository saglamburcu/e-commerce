import "./Error.scss";

const Error = ({status, message}) => {
  return (
    <div className={`infoMessage ${status}`}>
      <p>{message}</p>
    </div>
  )
}

export default Error;