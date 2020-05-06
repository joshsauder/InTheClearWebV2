import React, {useState, useEffect} from 'react'
import PastStops from './PastStop'
import {Modal} from 'react-bootstrap'
import '../../style/TripHistory.css'
import Axios from 'axios'
import {useSelector} from 'react-redux'

function TripHistoryContainer() {
    
    const [trips, setTrips] = useState([])
    const userId = useSelector(state => state.loginInfo.id)
    console.log(userId)

    useEffect(() => {
        Axios.get(`http://localhost:5000/api/Trip?id=${userId}`)
        .then(res => setTrips(res.data) )
    }, [])

    const tripSelected = (id) => {
        console.log(id)
    }

    return(
        <Modal show={true}>
            <div className="HistoryContainer">
                {trips.map(trip => <PastStops stop={trip} selectStop={tripSelected}/>)}
            </div>
        </Modal>
    )
    
}

export default TripHistoryContainer