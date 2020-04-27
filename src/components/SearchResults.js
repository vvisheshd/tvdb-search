import React from 'react';
import { tryGetYear } from '../helpers/date-helpers';
import { useHistory } from "react-router-dom";

export default (props) => {
    const { data } = props;
    const history = useHistory();
    const loadSeriesDetails = (e) => {
        //history.push(`/details/${e.target.getAttribute('data-id')}`);
    }
    return (
        <div>
            <ul className="">
                {data.map((series, index) => {
                    return <li key={index} className="row-item">
                        {series.image && <img className="row-img" src={'images'+series.image}></img>}
                        <div className="info-column">
                            <div>
                                <a href={`/series/${series.id}`} data-id={series.id} className="series-name" onClick={loadSeriesDetails}>{series.seriesName}</a>
                                <span className="small-text">TV, {tryGetYear(series.firstAired)}</span>
                            </div>
                            <div className="row-overview">{series.overview}</div>
                            <div className="small-text">Status - {series.status}</div>
                        </div>
                    </li>
                })}
            </ul>
        </div>
    );
}