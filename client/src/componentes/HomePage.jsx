import React, {Fragment} from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { filterCreated, getDogs } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import style from './HomePage.module.css';
import SearchBar from "./SearchBar";
import "redux-devtools-extension";

export default function Home (){
    const dispatch = useDispatch()
    const allDogs = useSelector ((state) => state.dogs)
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage,setDogsPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog,indexOfLastDog)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    


    useEffect(()=>{
        dispatch(getDogs());
    },[dispatch])


    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());

    }

    function handleFilterCreated (e) {
        dispatch(filterCreated(e.target.value))
    }

    return (
        <div>
            <Link to= '/dogs'>Crear perro</Link>
            <h1>DOGS</h1>
            <button onClick={e=> {handleClick(e)}}>Volver a cargar todos los perros</button>
            <div>
            <select className={style.select}>
                    <option value="asc" >Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value='All'>Tipo</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Api</option>
                </select>
                <Paginado
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginado={paginado} >

                </Paginado>
                
                <SearchBar>Buscar...</SearchBar>
                {currentDogs?.map((e, index) =>{
                    return (
                        <Fragment key={`dog-${index}`}>
                        <Link to={"/home/" + e.id}>
                    <Card name={e.name} image={e.image} temperaments={e.temperaments} weight={e.weight} />
                    </Link>
                    </Fragment>
                    )
                   })}


            </div>
        </div>
    )
}


    
    //function handleFilterTemperament(e){
      //dispatch(filterDogsByTemperament(e.target.value))
    //}

    

    
           
    
