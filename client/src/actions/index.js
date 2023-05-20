import axios from 'axios';
export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT';
export const GET_DOGS = "GET_DOGS";
export const FILTER_CREATED = 'FILTER_CREATED';

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