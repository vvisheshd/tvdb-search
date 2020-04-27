import { searchTypes } from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    error: null,
    results: []
}

export const search = (state = initialState, action) => {
    switch(action.type){
        case searchTypes.SEARCH_REQUEST:
            return { ...state,
                isLoading: true,
                error: null,
                results: []
            }
        case searchTypes.SEARCH_SUCCESS:
            return { ...state,
                isLoading: false,
                results: action.payload ? action.payload.result : [],
                error: null
            }
        case searchTypes.SEARCH_FAILURE:
            return { ...state,
                isLoading: false,
                error:  action.payload ? action.payload.error : '',
                results: []
            }
        default:
            return state;

    }
}