import "./PageNotFound.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const PageNotFound = () => {
  return (
    <div className="page__not__found">
      <div className="page__not__found__modal">
        <span className="page__not__found__modal__icon">
          <FontAwesomeIcon icon={faCircleExclamation} />
        </span>
        <h1 className="page__not__found__modal__text">Sayfa bulunamadı</h1>
      </div>
    </div>
  )
}

export default PageNotFound;