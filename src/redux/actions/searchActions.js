import { searchTypes } from './actionTypes';
import { searchSeries, getImageBlob } from '../../api/tvdbapi';
import { NO_RESULT } from '../../utils/constants';

const searchRequest = (searchKey) => ({ type: searchTypes.SEARCH_REQUEST, payload: { searchKey } });
const searchSuccess = (result) => ({ type: searchTypes.SEARCH_SUCCESS, payload: { result } });
const searchFailure = (error) => ({ type: searchTypes.SEARCH_FAILURE, payload: { error } });

const getSearchResults = (searchKey) => async (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
        dispatch(searchRequest());
        if(!searchKey) {
            dispatch(searchFailure('')); 
            reject({error: 'Invalid search key'}); 
            return;
        }
        try {
            const result = await searchSeries(searchKey);
            result === NO_RESULT ? dispatch(searchFailure('No results found for your search!')) : dispatch(searchSuccess(result.data))
            resolve(result.data);
        } catch(ex) {
            console.log(ex);
            dispatch(searchFailure('Error getting search results, please try Later'));
            reject({ error: 'Error getting search results, please try Later' });
        }
    });
}

const getImageAsBlob = (url) => {
    return getImageBlob(url)
}
export const searchActions = {
    getSearchResults,
    getImageAsBlob
}