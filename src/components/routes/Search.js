import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBox from '../SearchBox';
import SearchResults from '../SearchResults';
import { searchActions } from '../../redux/actions';
import Loading from '../Loading';
import { debounce } from 'lodash';
import InfiniteScroll from "react-infinite-scroller";
import { useHistory } from "react-router-dom";

export default (props) => {
    const dispatch = useDispatch();
    const results = useSelector(state => state.search.results);
    const isLoading = useSelector(state => state.search.isLoading);
    const error = useSelector(state => state.search.error);
    const params = new URLSearchParams(props.location.search);
    const history = useHistory();
    const onSearchChange = debounce((value) => {
        dispatch(searchActions.getSearchResults(value));
        //history.push(`?key=${value}`)
       }, 300);

    /** states for Infinite scroll */
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    if(results.length > 0  && !hasMore) setHasMore(true);
    if(results.length === 0 && items.length !== 0) setItems([]);
    const loadMore = (p) => { 
        if(p !== 0 && items.length < results.length){
            setItems(results.slice(0,  items.length + 10));
        }
    }
    
    return (
        <div>
            <div className="search-box-conatiner">
                <SearchBox placeholder='Search Series' onChange={onSearchChange}></SearchBox>
                {results.length > 0 && <span style={{paddingLeft: '29%' }}>{results.length} results found!</span>}
                {error && <span className="error">{error}</span>}
            </div>
            <div className="search-result-wrapper">
                {isLoading && <Loading className="align-center"/>}
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadMore}
                    hasMore={hasMore}
                    useWindow={true}
                    loader={<div className="loader" key={0}></div>} > 
                    <SearchResults data={items}/>
                </InfiniteScroll>
                
            </div>
        </div>
    );
}