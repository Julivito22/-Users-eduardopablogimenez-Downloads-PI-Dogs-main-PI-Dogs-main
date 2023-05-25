import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterDogsByTemperament, getDogs, sortDogsByAlphabet, sortDogsByWeight, filterCreated } from "../actions";
import { Link, useNavigate } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import style from './HomePage.module.css';
import SearchBar from "./SearchBar";
import Ordenamiento from './Ordenamiento';

export default function Home() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const filteredDogs = useSelector((state) => state.filteredDogs);
  const [temperaments] = useState([]);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;

  const [filterOptions, setFilterOptions] = useState({
    name: "",
    temperament: "",
    origin: "",
  });

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs =
    filteredDogs.length > 0
      ? filteredDogs
      : dogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    setFilterOptions({
      name: "",
      temperament: "",
      origin: "",
    });
    dispatch(getDogs());
  };

  function handleOrdenAlfabetico(orden) {
    dispatch(sortDogsByAlphabet(orden));
  }

  function handleOrdenPeso(orden) {
    dispatch(sortDogsByWeight(orden));
  }

  function handleFilterTemperament(e) {
    const value = e.target.value;
    setFilterOptions({
      ...filterOptions,
      temperament: value,
    });
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  

  

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <SearchBar>Buscar...</SearchBar>
      <Link to="/dogs" className={style.dogLink}>
        CREA TU PERRO
      </Link>

      <button onClick={handleGoBack} className={style.back}>LOG OUT</button>

      <h1 className={style.title}>DOGS</h1>
      <img src="/images/perrito.png" alt="Perro" className={style.dog} />

      <div>
        <div>
          <select
            value={filterOptions.temperament}
            onChange={handleFilterTemperament}
          >
            <option value="">All</option>
            {temperaments.map((temp) => (
              <option key={temp.id} value={temp.name}>
                {temp.name}
              </option>
            ))}
          </select>
          
        </div>
        <Ordenamiento
          handleOrdenAlfabetico={handleOrdenAlfabetico}
          handleOrdenPeso={handleOrdenPeso}
          handleFilterTemperament={handleFilterTemperament}
          handleFilterCreated={handleFilterCreated}
        />
        <button onClick={(e) => handleClick(e)} className={style.cargar}>
          VOLVER A CARGAR TODOS LOS PERROS
        </button>

        <Paginado dogsPerPage={dogsPerPage} totalDogs={dogs.length} paginado={paginado} />

        <div className="dog-list">
          {currentDogs.map((dog, index) => {
            return (
              <Fragment key={`dog-${index}`}>
                <Link to={"/home/" + dog.id} className={style.cardLink}>
                  <Card
                    key={dog.id} // Agrega una clave única aquí
                    name={dog.name}
                    image={dog.image}
                    temperament={dog.temperament}
                    weight={dog.weight}
                    className={style.card}
                  />
                </Link>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}


    
    

    
           
    
