import React from 'react'
import danger from '../../images/danger.png'

export default function PastStops({stop, selectStop}){

    //ms * sec * min * hour
    let date = Math.floor((Date.now() - Date.parse(stop.createdAt)) / (1000 * 60 * 60 * 24))
    let url = `https://maps.googleapis.com/maps/api/staticmap?size=600x300&markers=color:red%7C${stop.locations[0].latitude},${stop.locations[0].longitude}&markers=color:red%7C${stop.locations[stop.locations.length - 1].latitude},${stop.locations[stop.locations.length - 1].longitude}&key=AIzaSyDjPZPz3Vv3KYdlkJ7ErdSVfpO2E707w0k`
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