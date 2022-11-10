import "./Step.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Step = ({ steps, orderDetail }) => {
  console.log(orderDetail)
  return (
    <div className="step-wizard">
      <div className="step-wizard-container">
        <ul className="step-wizard-list">
          {
            steps && steps.map((item, index) => (
              <li key={index} className={item.status == orderDetail ? "step-wizard-item current-item" : "step-wizard-item"}>
                <span className="progress-count">
                  <FontAwesomeIcon className="status__icon__circle__item" icon={item.icon} />
                </span>
                <span className="progress-label">{item.text}</span>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Step;