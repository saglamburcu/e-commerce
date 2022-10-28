import "./Loading.scss";
import { IoMdPaw } from "react-icons/io";

const Loading = () => {
  return (
    <div className="loading">
      {/* Loading... */}
      <div className="loading__paw">
        <IoMdPaw className="loading__paw__item1" />
        <IoMdPaw className="loading__paw__item2" />
      </div>
    </div>
  )
};

export default Loading;