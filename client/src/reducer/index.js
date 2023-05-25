

const initialState = {
  dogs: [],
  dog: [],
  allDogs: [],
  filteredDogs: [],
  temperamentos: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_DOGS':
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case 'GET_NAME_DOGS':
      return {
        ...state,
        dogs: action.payload,
      };
      case 'FILTER_DOGS_BY_TEMPERAMENT':
  const filteredDogsByTemperament = state.dogs.filter((dog) => {
    const temperaments = dog.temperament.split(',').map((t) => t.trim());
    return temperaments.includes(action.payload.trim());
  });
  return {
    ...state,
    filteredDogs: filteredDogsByTemperament,
  };

    case 'FILTER_CREATED':
      const allDog = state.allDogs;
      const createdFilter =
        action.payload === 'created'
          ? allDog.filter(el => el.createdInDb)
          : allDog.filter(el => !el.createdInDb);
      return {
        ...state,
        dogs:
          action.payload === 'All' ? state.allDogs : createdFilter,
      };
    case 'SORT_DOGS_BY_ALPHABET':
      const sortedDogsByAlphabet = [...state.dogs].sort((a, b) =>
        action.payload === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
      return {
        ...state,
        dogs: sortedDogsByAlphabet,
      };
      case 'SORT_DOGS_BY_WEIGHT':
  const sortedDogsByWeight = [...state.dogs].sort((a, b) => {
    if (action.payload === 'asc') {
      return a.weight.toString().localeCompare(b.weight.toString());
    } else if (action.payload === 'desc') {
      return b.weight.toString().localeCompare(a.weight.toString());
    }
    return 0;
  });
  return {
    ...state,
    dogs: sortedDogsByWeight,
  };

    case 'GET_DOG_DETAIL':
      return {
        ...state,
        dogDetail: action.payload,
      };
    case 'SET_PERROS':
      return {
        ...state,
        dogs: action.payload,
      };
    case 'SET_TEMPERAMENTOS':
      return {
        ...state,
        temperamentos: action.payload,
      };
    case 'SET_PERROS_FILTRADOS':
      return {
        ...state,
        filteredDogs: action.payload,
      };
      case 'FILTER_DOGS_BY_ORIGIN':
      // Filtrar los perros por origen (creados o de la API)
      const origin = action.payload;
      const filteredDogs = state.dogs.filter((dog) => dog.origin === origin);
      return {
        ...state,
        filteredDogs,
      };
    case 'RESET_FILTER':
      // Restablecer el filtro y mostrar todos los perros
      return {
        ...state,
        filteredDogs: [],
      };

      
    default:
      return state;
  }
}

export default rootReducer;

  

