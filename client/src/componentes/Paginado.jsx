import React from "react";



export default function Paginado ({dogsPerPage, allDogs, paginado}){
const pageNumbers =[]

for (let i=0; i<=Math.ceil(allDogs.length/dogsPerPage); i++){
    pageNumbers.push(i+1)
}

return(
    <nav >
        <ul className="paginado">
            {pageNumbers &&
            pageNumbers.map((number)=> (
                <li className="number" key={`page-${number}`}>
               <a href="/home" onClick={()=> paginado(number)}>{number} </a> 
               </li>
               ))}
        </ul>
    </nav>
)}