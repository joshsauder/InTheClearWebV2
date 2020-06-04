import React, {Component} from 'react';
import { withRouter } from 'react-router';
import UserInfo from './UserInfo';
import '../App.css';
import '../style/GooglePlaces.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import {connect} from "react-redux";
import {mapStatetoProps} from '../redux/container/loginContainer'
import {setLoginInfo} from '../redux/actions'
import logo from '../images/InTheClear.png';
import Axios from 'axios';
import firebase from 'firebase/app'
import 'firebase/auth';


class GooglePlaces extends Component {

    constructor(props) {
        super(props);
        this.state ={
            startCoordinates: {
                lat: 37.3317,
                lng: -122.0306,
                name: "Apple HQ"
            },
            endCoordinates :{
                lat: 37.3317,
                lng: -122.0306,
                name: "Apple HQ"
            }

        }
        
      }

      componentDidMount(){
          
          this.startInput = document.getElementById('locationStart');
          this.destinationInput = document.getElementById('locationEnd')

          this.autocompleteStart = new window.google.maps.places.Autocomplete(this.startInput);
          this.autocompleteDest = new window.google.maps.places.Autocomplete(this.destinationInput);

          window.google.maps.event.addListener(this.autocompleteStart, 'place_changed', this.handlePlacesStartSelect)
          window.google.maps.event.addListener(this.autocompleteDest, 'place_changed', this.handlePlacesEndSelect)

      }

      componentDidUpdate(prevProps, prevState){

        if(prevState.startCoordinates !== this.state.startCoordinates){
            this.props.callbackStart(this.state.startCoordinates);
        } else if(prevState.endCoordinates !== this.state.endCoordinates){
            this.props.callbackEnd(this.state.endCoordinates);
        }

        if(this.props.end !== prevProps.end || this.props.start !== prevProps.start){
            this.startInput.value = this.props.start.name
            this.destinationInput.value = this.props.end.name
        }

      }

      handlePlacesStartSelect = () => {

        var placeStart = this.autocompleteStart.getPlace();
        var lat = placeStart.geometry.location.lat();
        var long = placeStart.geometry.location.lng();
        this.setState({startCoordinates:{lat: lat, lng: long, name: placeStart.formatted_address}})

      }

      handlePlacesEndSelect = () => {

        var placeEnd = this.autocompleteDest.getPlace();
        var lat = placeEnd.geometry.location.lat();
        var long =  placeEnd.geometry.location.lng();
        this.setState({endCoordinates:{lat: lat, lng: long, name: placeEnd.formatted_address}})

      }

      handleLogout = () => {
        firebase.auth().signOut();
        Axios.defaults.headers.common['Authorization'] = ""

        let initState = { id: "", displayName: "", paid: ""}
        this.props.dispatch(setLoginInfo(initState))

        this.props.history.push('/login')
      }

      render() {
          return (
          <div className="row container">
            <Jumbotron className="directionsJumbotron ml-2 mt-2 col-md-5 col-12">
                <div className="row justify-content-between">
                    <img className="d-block img-logo-places mb-1 ml-3" alt="logo" src={logo}></img>
                    <UserInfo name={this.props.name} logout={this.handleLogout} /> 
                </div>
                <div className="input-group mb-1 mt-4">
                    <input className="form-control" id="locationStart" type="text" size="50" placeholder="Start Location" autoComplete="on" runat="server" />
                </div>
                <div className="input-group mb-1 mt-4">
                    <input className="form-control" id="locationEnd" type="text" size="50" placeholder="Destination Location" autoComplete="on" runat="server" />
                </div>
            </Jumbotron>
          </div>
          )
      }
}

//get user props from Redux
export default withRouter(connect(mapStatetoProps)(GooglePlaces));