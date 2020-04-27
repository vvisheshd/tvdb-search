import { NO_RESULT , INVALID_TOKEN } from '../utils/constants';

const apiKey = 'c8ceb842169d01b6515defe9c20a25a0';
const jwt = null;

const fetchJWT = () => {
    return fetch("api/login", {
        body: JSON.stringify({"apiKey": apiKey}),
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
        },
        method: "POST"
    })
    .then((res) => res.json());
}
const fetchImage  = (imageUrl, token) => {
    return fetch(imageUrl, {
        headers: {
            'Authorization': `Bearer ${token}`
          }
    })
    .then(response => response.blob())
    .then(images => {
        debugger;
        // Then create a local URL for that image and print it 
        const outside = URL.createObjectURL(images);
        return outside;
    })
}
const fetchSeries = async (searchKey, token) => {
    return await fetch(`api/search/series?name=${searchKey}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
        })
        .then((res) => { 
            const status = res.status;
            if(status === 404) return NO_RESULT;
            if(status === 401) return INVALID_TOKEN;
            return res.json(); 
        });
}
const getResults = async (searchKey) => {
  //If JWT already there dont call the API.
  const jwtPromise = !jwt ? fetchJWT() : Promise.resolve(jwt);
  const tokenRes = await jwtPromise;
  //handle case when can not get JWT 
  return await fetchSeries(searchKey, tokenRes.token);
}

const searchSeries = async (searchKey) => {
    const response = await getResults(searchKey);
    if(response === INVALID_TOKEN){ //if token invalid try get new token and make the api call again.
        jwt = null; 
        return await getResults(searchKey);
    }
    return response;
}
const getImageBlob = async (imageUrl) => {
    const jwtPromise = !jwt ? fetchJWT() : Promise.resolve(jwt);
    const tokenRes = await jwtPromise;
    return await fetchImage(imageUrl, tokenRes.token);
}
export { searchSeries, getImageBlob };