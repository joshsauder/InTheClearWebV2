import React, {useState, useEffect} from 'react'
import PastStops from './PastStop'
import {Modal} from 'react-bootstrap'
import '../../style/TripHistory.css'
import Axios from 'axios'
import {useSelector} from 'react-redux'

function TripHistoryContainer({show, hide, showStop}) {
    
    const [trips, setTrips] = useState([])
    const userId = useSelector(state => state.loginInfo.id)

    //will need to add prop that adds any new trips to list
    useEffect(() => {
        Axios.get(`http://localhost:5000/api/Trip?id=${userId}`)
        .then(res => setTrips(res.data) )
    }, [])

    return(
        <Modal show={show} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>History</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="HistoryContainer">
                {trips.map(trip => <PastStops stop={trip} selectStop={showStop}/>)}
            </div>
            </Modal.Body>
        </Modal>
    )
    
}

export default TripHistoryContainer