import React from 'react'

export default function PastStops({stop, selectStop}){

    //ms * sec * min * hour
    let date = Math.floor((Date.now() - Date.parse(stop.createdAt)) / (1000 * 60 * 60 * 24))
    //API key whitelisted
    let url = `https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=${process.env.REACT_APP_HERE_MAPS}&w=600&h=300&z=12&f=0&poi=${stop.locations[0].latitude},${stop.locations[0].longitude},${stop.locations[stop.locations.length - 1].latitude},${stop.locations[stop.locations.length - 1].longitude}&poilbl=1&poitxs=18&poifc=ff0000`
    return(
        <div className="HistoryDataContainer" onClick={() => selectStop(stop)}>
            <div className="HistoryDataGrid text-purple">
                <div className="GridItem">{stop.locations[0].city} - {stop.locations[stop.locations.length - 1].city}</div>
                <div className="GridItem">{date} days ago</div>
                <div className="GridItem TripTime">Distance: {Math.floor(stop.distance/1609.344)} miles</div>
            </div>
            <img src={url} alt="map" />
        </div>
    )
}