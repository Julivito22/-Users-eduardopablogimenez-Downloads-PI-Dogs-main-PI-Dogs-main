

const initialState = {
    dogs: [],
    allDogs: [],
    filteredDogs: [],
    temperamentos: [],
    perrosFiltrados: [],
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
      case 'GET_DOGS':
        return {
          ...state,
          dogs: action.payload,
          allDogs: action.payload,
        }
      case 'GET_NAME_DOGS':
        return {
          ...state,
          dogs: action.payload,
        }
        case 'FILTER_BY_TEMPERAMENT':
      const temperamentoSeleccionado = action.payload;
      if (state.allDogs && state.allDogs.length > 0) {
        const perrosFiltrados = state.allDogs.filter((perro) => {
          const temperamentos = perro.temperament;
          if (temperamentos && Array.isArray(temperamentos)) {
            const temperamentosFormateados = temperamentos.map((temperamento) =>
              temperamento.trim()
            );
            return temperamentosFormateados.includes(temperamentoSeleccionado);
          }
          return false;
        });

        return {
          ...state,
          filteredDogs: perrosFiltrados,
        };
      }
          return state;
      case 'FILTER_CREATED':
        const allDog = state.allDogs;
        const createdFilter =
          action.payload === 'created'
            ? allDog.filter((el) => el.createdInDb)
            : allDog.filter((el) => !el.createdInDb);
        return {
          ...state,
          dogs:
            action.payload === 'All' ? state.allDogs : createdFilter,
        }

        case 'SORT_DOGS_BY_ALPHABET':
      const sortedDogsByAlphabet = [...state.dogs].sort((a, b) =>
        action.payload === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
      return {
        ...state,
        dogs: sortedDogsByAlphabet,
      };

      case 'SORT_DOGS_BY_WEIGHT':
        const sortedDogsByWeight = [...state.dogs].sort((a, b) =>
          action.payload === 'asc' ? a.weight - b.weight : b.weight - a.weight
        );
        return {
          ...state,
          dogs: sortedDogsByWeight,
        };

        case 'GET_DOG_DETAIL':
      return {
        ...state,
        dogDetail: action.payload,
      };

        case 'GET_DOG_DETAIL_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'GET_DOG_DETAIL_SUCCESS':
      return {
        ...state,
        loading: false,
        dogDetail: action.payload,
        error: null,
      };
    case 'GET_DOG_DETAIL_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case 'SET_PERROS':
      return {
        ...state,
        perros: action.payload,
      };
    case 'SET_TEMPERAMENTOS':
      return {
        ...state,
        temperamentos: action.payload,
      };
    case 'SET_PERROS_FILTRADOS':
      return {
        ...state,
        perrosFiltrados: action.payload,
      };
    default:
      return state;
  }
};
      
   
  

export default rootReducer;