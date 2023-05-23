import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../actions";
import style from './SearchBar.module.css';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  useEffect(() => {
    console.log(name); 
  }, [name]);

  function handleInputChange(e) {
    e.preventDefault();
    const newName = e.target.value;
    setName(newName);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameDogs(name));
  }

  return (
    <form onSubmit={handleSubmit} className={style.SearchBar}>
      <input
        type="text"
        placeholder="Buscar..."
        onChange={handleInputChange}
        className={style.searchBar}
      />
      <button type="submit" className={style.click}>
        Buscar
      </button>
    </form>
  );
}