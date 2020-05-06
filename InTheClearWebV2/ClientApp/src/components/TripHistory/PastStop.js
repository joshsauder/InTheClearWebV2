import React from 'react'
import danger from '../../images/danger.png'

export default function PastStops({stop, selectStop}){

    //ms * sec * min * hour
    let date = Math.floor((Date.now() - Date.parse(stop.createdAt)) / (1000 * 60 * 60 * 24))
    return(
        <div className="HistoryDataContainer" onClick={() => selectStop(stop.tripId)}>
            <div className="HistoryDataGrid text-purple">
                <div className="GridItem">{stop.locations[0].city} - {stop.locations[stop.locations.length - 1].city}</div>
                <div className="GridItem">{date} days ago</div>
                <div className="GridItem TripTime">Distance: {Math.floor(stop.distance/1609.344)} miles</div>
            </div>
            <img src={danger}/>
        </div>
    )
}