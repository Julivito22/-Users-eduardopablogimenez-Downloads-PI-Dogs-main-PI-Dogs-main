

const initialState = {
    dogs: [],
    allDogs: []
}

function rootReducer(state= initialState, action) {
    switch(action.type) {
        case'GET_DOGS':
        return{
            ...state,
            dogs: action.payload,
            allDogs: action.payload
        }
        case 'GET_NAME_DOGS':
            return {
                ...state,
                dogs: action.payload
            }
        case 'FILTER_BY_TEMPERAMENT' : 
        const allDogs= state.allDogs
        const temperamentFiltered = action.payload === 'All' ? allDogs : allDogs.filter(el => el.type === action.payload)
        return {
            ...state,
            dogs: temperamentFiltered
    
        }
        case 'FILTER_CREATED':
            const allDog = state.allDogs
            const createdFilter = action.payload === 'created' ? allDog.filter(el => el.createdInDb) : allDog.filter (el => !el.createdInDb)
            return{
                ...state,
                dogs: action.payload === 'All' ? state.allDogs : createdFilter
            }
        default:
            return state;
    
    }
   
   
}

export default rootReducer;