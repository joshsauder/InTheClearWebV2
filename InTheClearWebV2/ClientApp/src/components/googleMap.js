import React, {createRef} from 'react';
import GooglePlaces from './GooglePlaces';
import PolylineGenerator from './PolylineGenerator';
import CityData from './CityData';
import TripStopsContainer from './TripStops/TripStopsContainer';
import {TripsModel} from '../models/trips';
import {mapStatetoProps} from '../redux/container/loginContainer'
import {Button} from 'react-bootstrap'
import Axios from 'axios';
import {connect} from "react-redux";
import googleMapsImg from '../images/icons8-google-maps-48.png'
import '../style/GoogleMaps.css'
import timeImg from '../images/time.png'
import listImg from '../images/baseline_list_black_24dp.png'
import TripHistoryContainer from './TripHistory/TripHistoryContainer';

class GoogleMap extends PolylineGenerator {

      constructor(props) {
        super(props);
        this.state = {
          loaded: false, 
          showCityData: false,
          startMarker: null,
          endMarker: null,
          tripData: new TripsModel(),
          showStopModal: false,
          showHistoryModal: false
        }
        this.showDirections = this.showDirections.bind(this);
        this.polylineArray = []
      }

      GoogleMapsRef = createRef()

      componentDidMount() {
        const googleMapsAPI = document.createElement("script")
        googleMapsAPI.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS}&libraries=places,geometry`;
        googleMapsAPI.id = "googleMaps"
        window.document.body.appendChild(googleMapsAPI);

        googleMapsAPI.addEventListener("load", () => {
          this.setState({loaded: true})
          this.googleMaps = this.createMap()
        })

        if(this.props.paid == false){
          const adsScript = document.createElement("script");

          adsScript.type = "text/javascript"
          adsScript.src = "//onemboaran.com/apu.php?zoneid=3132718"
          adsScript.async = true
          window.document.body.appendChild(adsScript)

        }
      }

      componentDidUpdate(prevProps, prevState){

        if(this.state.tripData.endLocation.lat !== 0 && this.state.tripData.endLocation.lng !== 0 && 
          this.state.tripData.startLocation.lat !== 0 && this.state.tripData.startLocation.lng !== 0){
            if (prevState.tripData.startLocation !== this.state.tripData.startLocation || prevState.tripData.endLocation !== this.state.tripData.endLocation){
                this.showModal()

            }
          }

      }


      createMap = () =>
        new window.google.maps.Map(this.GoogleMapsRef.current, {
          zoom: 10,
          center: {
            lat: 37.3230,
            lng: -122.0322
          },
          disableDefaultUI: true,
        })

      showModal = () => this.setState({showStopModal: true})

      async showDirections(stops, dates){
          this.setState({showStopModal: false, showCityData: true})

          //revert polyline generate to its initial state
          this.revertToInitState()

          this.polylineArray.forEach(line => {
            line.setMap(null)
          })
          this.polylineArray = []
          var bounds = new window.google.maps.LatLngBounds();

          //set stops
          var tripData = Object.assign({}, this.state.tripData)
          tripData.stops = [...stops]

          //get directions with times
          const polylineStops = [tripData.startLocation, ...stops, tripData.endLocation]
          var directionsData = await this.createPolylineAndWeatherData(polylineStops, this.googleMaps, bounds, dates)

          this.googleMaps.fitBounds(directionsData[0])

          //set trip data
          tripData.tripData = [...directionsData[1]]
          tripData.duration = directionsData[2]
          tripData.distance = directionsData[3]

          //if paid, save stops
          if(this.props.paid == true){ this.postStops(tripData) }
          this.setState({
            tripData: tripData
          })

      }


      postStops = (tripData) => {
        //save each stop
        //need to use forEach in the small case the trip does not exist (unincorperated towns).
        const data = []
        const stops = [tripData.startLocation, ...tripData.stops, tripData.endLocation]
        stops.forEach(stop => {
          //get first occurance
          let trip = tripData.tripData.filter(trip =>{
            return String(stop.name).indexOf(String(trip.city)) > -1 || String(trip.city).indexOf(String(stop.name)) > -1
          })[0]
          if(trip){
            data.push(
            {
              City: trip.city,
              Condition: trip.weather.Description,
              Temperature: Math.round(trip.weather.Temperature),
              Latitude: stop.lat,
              Longitude: stop.lng
            })
          }
        })

        const postData = {
          UserId: this.props.id,
          Duration: tripData.duration,
          Distance: tripData.distance,
          Locations: data
        }
        
        Axios.post('/api/Trip', postData).catch(err => {
          console.log(err)
        })
      }

      callbackStart = (coordinates) => {
          var tripData = Object.assign({}, this.state.tripData)
          tripData.startLocation = coordinates
          this.setState({tripData: tripData});

          if(this.state.markerStart){ this.state.markerStart.setMap(null); }

          var newCoordinates = new window.google.maps.LatLng(coordinates.lat, coordinates.lng);

          this.state.markerStart = new window.google.maps.Marker({
            position: newCoordinates,
            map: this.googleMaps,
            title: "Start Location",
            animation: window.google.maps.Animation.DROP
          })
          this.googleMaps.setCenter(newCoordinates)
          this.state.markerStart.setMap(this.googleMaps)

      }

      callbackEnd = (coordinates) => {
        var tripData = Object.assign({}, this.state.tripData)
        tripData.endLocation = coordinates
        this.setState({tripData: tripData});

        if(this.state.markerEnd){ this.state.markerEnd.setMap(null); }

        var newCoordinates = new window.google.maps.LatLng(coordinates.lat, coordinates.lng);

        this.state.markerEnd = new window.google.maps.Marker({
          position: newCoordinates,
          title: "End Location",
          animation: window.google.maps.Animation.DROP
        })

        this.googleMaps.setCenter(newCoordinates)
        this.state.markerEnd.setMap(this.googleMaps)

      }

      determineUrl = () => {
        let url = `https://www.google.com/maps/dir/?api=1&origin=${this.state.tripData.startLocation.name}&destination=${this.state.tripData.endLocation.name}&travelmode=driving`

        let waypoints = "&waypoints="
        this.state.tripData.stops.forEach((stop, index) => {
            if(index !== 0 && index !== this.state.tripData.stops.length -1){
              waypoints += stop.name + "%7C"
            }
        })

        if(waypoints !== "&waypoints="){url += waypoints.substring(0, waypoints.length - 3)}

        return url;
      }

      showHistoryTrip = (trip) => {
        //update start and end markers and tripdata object data
        this.callbackStart({ lat: trip.locations[0].latitude, lng: trip.locations[0].longitude, name: trip.locations[0].city })
        this.callbackEnd({ lat: trip.locations[trip.locations.length - 1].latitude, lng: trip.locations[trip.locations.length - 1].longitude, name: trip.locations[trip.locations.length - 1].city })

        let tripData = {...this.state.tripData}

        tripData.stops = trip.locations.slice(1, trip.locations.length-1).map(loc => {
          return {lat: loc.latitude, lng: loc.longitude, name: loc.city}
        })

        this.setState({tripData: tripData, showHistoryModal: false, showCityData: false})
      }

      render() {
        let googleMapsUrl = this.determineUrl()
        let modalClose = () => this.setState({ showStopModal: false });
        let closeCityData = () => { this.setState({showCityData: false}) }
        let editTrip = () => {this.setState({ showStopModal: true})}
        let showHistory = () => {this.setState({showHistoryModal: true})}
        let hideHistory = () => {this.setState({showHistoryModal: false})}

        return (
          <div>
            <div className="map" ref={this.GoogleMapsRef} />
              <TripHistoryContainer show={this.state.showHistoryModal} hide={hideHistory} showStop={this.showHistoryTrip}/>
              { this.state.loaded && <GooglePlaces start={this.state.tripData.startLocation} end={this.state.tripData.endLocation} callbackStart={this.callbackStart} callbackEnd={this.callbackEnd} />  }
              { this.state.showCityData && <CityData cityData={this.state.tripData} hide={closeCityData} /> }
              { this.state.loaded ? 
                <TripStopsContainer 
                show={this.state.showStopModal} 
                hide={modalClose} 
                trip={this.state.tripData}
                callback={this.showDirections} /> 
                : null }
                <div className="fix-right btn-group-vertical">
                {this.props.paid && 
                  <Button className="btn-social p-2 mb-2" onClick={showHistory} rel="Trip History"><img className="img-button" src={timeImg}></img></Button>
                }
                { this.state.tripData.distance > 0 &&
                  <React.Fragment>
                    <Button className="btn-social p-2 mb-2" onClick={editTrip} title="Edit Trip Data"><img className="img-button" src={listImg} /></Button>
                    <a className="btn btn-social p-2" target="_blank" href={googleMapsUrl} title="Export to Google Maps"><img className="img-button" src={googleMapsImg}></img></a> 
                  </React.Fragment>
                }
                </div>
          </div>
        );
      }
    
}

//get user props from redux
export default connect(mapStatetoProps)(GoogleMap);