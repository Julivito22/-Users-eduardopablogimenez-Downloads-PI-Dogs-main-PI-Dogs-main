import React, { Fragment } from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {  filterDogsByTemperament, getDogs, sortDogsByAlphabet, sortDogsByWeight, filterCreated } from "../actions";
import { Link, useNavigate } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import style from './HomePage.module.css';
import SearchBar from "./SearchBar";
import "redux-devtools-extension";
import Ordenamiento from './Ordenamiento';



export default function Home() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const filteredDogs = useSelector((state) => state.filteredDogs);
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

  function handleOrdenAlfabetico (orden) {
    dispatch(sortDogsByAlphabet(orden));
  };

  function handleOrdenPeso (orden) {
    dispatch(sortDogsByWeight(orden));
  };

  

  function handleFilterTemperament (e) {
    const value = e.target.value;
    setFilterOptions({
      ...filterOptions,
      temperament: value,
    });
    dispatch(filterDogsByTemperament(value));
  };


  function handleFilterCreated (e){
    dispatch(filterCreated(e.target.value));
  }; 
 
  const handleGoBack = () => {
    navigate(-1);
  };
  

  

  return (
    <div>
      <SearchBar>Buscar...</SearchBar>
      <Link to="/dogs" className={style.dogLink}>
        Crear perro
      </Link>
      
      <button onClick={handleGoBack} className={style.back}>LOG OUT</button>
      
      
      <h1 className={style.title} >DOGS</h1>
      <img src="/images/perrito.png" alt="Perro" className={style.dog} />
    
      
      

      
      <div>
        <Ordenamiento
          handleOrdenAlfabetico={handleOrdenAlfabetico}
          handleOrdenPeso={handleOrdenPeso}
          filteredDogs={handleFilterTemperament}
          handleFilterCreated={handleFilterCreated}
        />
        <button onClick={(e) => handleClick(e)} className={style.cargar} >VOLVER A CARGAR TODOS LOS PERROS</button>


        

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
  


    
    

    
           
    
