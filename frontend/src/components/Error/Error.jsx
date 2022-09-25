import "./Error.scss";

const Error = ({message}) => {
  return (
    <div className="error">
      <p>{message}</p>
    </div>
  )
}

export default Error;