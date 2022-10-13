import { useState } from "react";
import "./Pagination.scss";

const Pagination = ({ totalPage, setPageNumber }) => {
  const [activePage, setActivePage] = useState(0);

  const changePageNumber = (index) => {
    setPageNumber(index + 1);
    setActivePage(index);
  }

  return (
    <div className="pagination">
      {
        [...Array(totalPage)].map((_, index) => (
          <button key={index} type="button" className={activePage === index ? "pagination__button pagination__active" : "pagination__button"} onClick={() => changePageNumber(index)}>{index + 1}</button>
        ))
      }
    </div>
  )
}

export default Pagination;