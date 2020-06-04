import React from 'react'

export default function PastStops({stop, selectStop}){
    //ms * sec * min * hour
    let date = Math.floor((Date.now() - Date.parse(stop.createdAt)) / (1000 * 60 * 60 * 24))
    //API key whitelisted
    let url = `https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=${process.env.REACT_APP_HERE_MAPS}&w=600&h=300&z=12&f=0&poi=${stop.locations[0].latitude},${stop.locations[0].longitude},${stop.locations[stop.locations.length - 1].latitude},${stop.locations[stop.locations.length - 1].longitude}&poilbl=1&poitxs=18&poifc=ff0000`

    const determineStops = () => {
        if(stop.locations.length > 2){
            let stopString = ""
            for(var i = 1; i < stop.locations.length - 1; i++){
                stopString +=  ` ${stop.locations[i].city},`
            }

            //remove last comma
            return stopString.substring(0, stopString.length - 1);
        }else return " None"
    }
    
    return(
        <div className="HistoryDataContainer" onClick={() => selectStop(stop)}>
            <div className="HistoryDataGrid text-purple">
                <div className="GridItem">{stop.locations[0].city} - {stop.locations[stop.locations.length - 1].city}</div>
                <div className="GridItem">{date} days ago</div>
                <div className="GridItem TripTime">Stops -{determineStops()}</div>
            </div>
            <img src={url} alt="map" />
        </div>
    )
}