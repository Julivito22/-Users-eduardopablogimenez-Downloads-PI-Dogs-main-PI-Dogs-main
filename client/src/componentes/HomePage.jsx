import React, { Fragment } from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { filterCreated, getDogs, sortDogsByAlphabet, sortDogsByWeight } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import style from './HomePage.module.css';
import SearchBar from "./SearchBar";
import "redux-devtools-extension";
import Ordenamiento from './Ordenamiento';



export default function Home() {
   
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const [currentPage, setCurrentPage] = useState(1);
    const dogsPerPage = 8;
   
    

  
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
  
    const paginado = (pageNumber) => {
      setCurrentPage(pageNumber);
    };


    
  
    useEffect(() => {
      dispatch(getDogs());
    }, [dispatch]);
  
    function handleClick(e) {
      e.preventDefault();
      dispatch(getDogs());
    }
  
    function handleFilterCreated(e) {
      dispatch(filterCreated(e.target.value));
    }

    const handleOrdenAlfabetico = (orden) => {
        dispatch(sortDogsByAlphabet(orden));
      };
    
      const handleOrdenPeso = (orden) => {
        dispatch(sortDogsByWeight(orden));
      };
    
  
    return (
      <div>
        <SearchBar >Buscar...</SearchBar>
            <Link to= '/dogs'>Crear perro</Link>
            <h1>DOGS</h1>
            
            <button onClick={e=> {handleClick(e)}}>Volver a cargar todos los perros</button>
            <div>
            
            <Ordenamiento handleOrdenAlfabetico={handleOrdenAlfabetico} handleOrdenPeso={handleOrdenPeso} />
            <span>Filtrar por:</span>
                <select onChange={e => handleFilterCreated(e)} className={style.select}>
                
                    <option value=''>Seleccionar</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Api</option>
                </select>
                
                <Paginado dogsPerPage={dogsPerPage} totalDogs={allDogs.length} paginado={paginado} />
        <div className="dog-list">
          {currentDogs.map((dog, index) => {
            return (
                <Fragment key={`dog-${index}`}>
                    <Link to={"/home/" + dog.id}>
        <Card key={dog.id} name={dog.name} image={dog.image} temperaments={dog.temperaments} weight={dog.weight} />
      </Link>
                </Fragment>
            )
            }
          )}
        </div>
      </div>
      </div>
    );
  }
  


    
    //function handleFilterTemperament(e){
      //dispatch(filterDogsByTemperament(e.target.value))
    //}

    

    
           
    
