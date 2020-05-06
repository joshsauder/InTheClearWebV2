import React from 'react'
import danger from '../../images/danger.png'

export default function PastStops({stop, selectStop}){

    //ms * sec * min * hour
    let date = Math.floor((Date.now() - Date.parse(stop.createdAt)) / (1000 * 60 * 60 * 24))

    return(
        <div className="HistoryDataContainer" onClick={() => selectStop(stop.locations)}>
            <div className="HistoryDataGrid text-purple">
                <div className="GridItem">{stop.locations[0].city} - {stop.locations[stop.locations.length - 1].city}</div>
                <div className="GridItem">{date} days ago</div>
                <div className="GridItem TripTime">Distance: {Math.floor(stop.distance/1609.344)} miles</div>
            </div>
            {/*
                <img src="https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyDjPZPz3Vv3KYdlkJ7ErdSVfpO2E707w0k" alt="new" />
                */
            }
            <img src={danger} alt="new" />
        </div>
    )
}