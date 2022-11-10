import "./Loading.scss";
import { IoMdPaw } from "react-icons/io";

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading__paw">
        <IoMdPaw className="loading__paw__item1" />
        <IoMdPaw className="loading__paw__item2" />
        <IoMdPaw className="loading__paw__item3" />
        <IoMdPaw className="loading__paw__item4" />
        <IoMdPaw className="loading__paw__item5" />
        <IoMdPaw className="loading__paw__item6" />
        <IoMdPaw className="loading__paw__item7" />
        <IoMdPaw className="loading__paw__item8" />
      </div>
    </div>
  )
};

export default Loading;