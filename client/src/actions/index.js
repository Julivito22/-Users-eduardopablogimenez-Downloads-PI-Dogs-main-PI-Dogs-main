import axios from 'axios';
export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT';
export const GET_DOGS = "GET_DOGS";
export const FILTER_CREATED = 'FILTER_CREATED';
export const SORT_DOGS_BY_ALPHABET = 'SORT_DOGS_BY_ALPHABET';
export const SORT_DOGS_BY_WEIGHT= 'SORT_DOGS_BY_WEIGHT';
export const GET_DOG_DETAIL='GET_DOG_DETAIL';
export const SET_PERROS_FILTRADOS='SET_PERROS_FILTRADOS';

export function getDogs(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/dogs', {

        });
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

export function getNameDogs(name) {
    return async function (dispatch){
        try{
            var response = await axios.get("http://localhost:3001/dogs?name=" + name);
            return dispatch({
                type: "GET_NAME_DOGS",
                payload: response.data
            })
        } catch(error) {
            console.log(error)
        }
    }
}

export function filterDogsByTemperament(payload){
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
}


export function filterCreated(payload){
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export const sortDogsByAlphabet = (order) => {
    return {
      type: 'SORT_DOGS_BY_ALPHABET',
      payload: order,
    };
  };
  
  
  export const sortDogsByWeight = (order) => {
    return {
      type: 'SORT_DOGS_BY_WEIGHT',
      payload: order,
    };
  };

  export const getDogDetail = (id) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`http://localhost:3001/dogs/${id}`);
        const dogDetail = response.data;
        dogDetail.image = {
          url: response.data.url
        };
        dispatch({ type: 'GET_DOG_DETAIL', payload: dogDetail });
      } catch (error) {
        console.log(error);
      }
    };
  };

  export const setPerrosFiltrados = (perrosFiltrados) => {
    return {
      type: 'SET_PERROS_FILTRADOS',
      payload: perrosFiltrados,
    };
  };