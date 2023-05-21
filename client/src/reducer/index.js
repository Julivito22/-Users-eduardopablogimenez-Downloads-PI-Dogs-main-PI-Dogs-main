

const initialState = {
    dogs: [],
    allDogs: [],
    filteredDogs: []
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
        const allDogs = state.allDogs;
        const temperamentFiltered =
          action.payload === 'All'
            ? allDogs
            : allDogs.filter((el) =>
                el.temperaments.includes(action.payload)
              );
        return {
          ...state,
          dogs: temperamentFiltered,
        }
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
    default:
      return state;
  }
};
      
   
  

export default rootReducer;