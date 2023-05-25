import axios from 'axios';

export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT';
export const GET_DOGS = "GET_DOGS";
export const FILTER_CREATED = 'FILTER_CREATED';
export const SORT_DOGS_BY_ALPHABET = 'SORT_DOGS_BY_ALPHABET';
export const SORT_DOGS_BY_WEIGHT = 'SORT_DOGS_BY_WEIGHT';
export const GET_DOG_DETAIL = 'GET_DOG_DETAIL';
export const SET_PERROS_FILTRADOS = 'SET_PERROS_FILTRADOS';
export const GET_NAME_DOGS = 'GET_NAME_DOGS';
export const FILTER_DOGS_BY_ORIGIN = 'FILTER_DOGS_BY_ORIGIN';
export const RESET_FILTER = 'RESET_FILTER';

export function getDogs() {
  return async function (dispatch) {
    try {
      const response = await axios.get('http://localhost:3001/dogs');
      return dispatch({
        type: GET_DOGS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getNameDogs(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/dogs/name?name=${name}`);
      return dispatch({
        type: GET_NAME_DOGS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const filterDogsByTemperament = (temperament) => {
  return {
    type: FILTER_BY_TEMPERAMENT,
    payload: temperament,
  };
};
export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}

export const sortDogsByAlphabet = (order) => {
  return {
    type: SORT_DOGS_BY_ALPHABET,
    payload: order,
  };
};

export const sortDogsByWeight = (order) => {
  return {
    type: SORT_DOGS_BY_WEIGHT,
    payload: order,
  };
};

export const getDogDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/dogs/${id}`);
      const dogDetail = response.data;
      dogDetail.image = {
        url: response.data.url,
      };
      dispatch({ type: GET_DOG_DETAIL, payload: dogDetail });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setPerrosFiltrados = (perrosFiltrados) => {
  return {
    type: SET_PERROS_FILTRADOS,
    payload: perrosFiltrados,
  };
};

export const filterDogsByOrigin = (origin) => {
  return (dispatch, getState) => {
    const { allDogs } = getState();
    const filteredDogs = allDogs.filter((dog) => {
      if (origin === 'created') {
        return dog.createdInDb;
      } else if (origin === 'api') {
        return !dog.createdInDb;
      }
      return true;
    });
    dispatch({ type: FILTER_DOGS_BY_ORIGIN, payload: filteredDogs });
  };
};

// Acción para restablecer el filtro y mostrar todos los perros
export const resetFilter = () => ({
  type: RESET_FILTER,
});