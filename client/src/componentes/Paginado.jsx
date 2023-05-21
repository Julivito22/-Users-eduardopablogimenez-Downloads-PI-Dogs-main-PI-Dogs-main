import React from "react";
import style from './Paginado.module.css';

export default function Paginado({ dogsPerPage, totalDogs, paginado }) {
  const totalPages = Math.ceil(totalDogs / dogsPerPage);

  const handleClick = (pageNumber) => {
    paginado(pageNumber);
  };

  return (
    <nav>
      <ul className={style.pagination}>
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <li key={pageNumber} className={style.page}>
              <button
                className={style.pageButton}
                onClick={() => handleClick(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

  