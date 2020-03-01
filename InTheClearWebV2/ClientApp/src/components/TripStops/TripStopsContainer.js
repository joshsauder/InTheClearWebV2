import React, {Component} from 'react';
import '../../style/TripStops.css'
import 'flatpickr/dist/themes/material_green.css'
import arrayMove from 'array-move';
import axios from 'axios';
import TripStopsModal from './TripStopsModal';
import RouteDataView from './RouteDataView';

class TripStopsContainer extends Component {

    constructor(props){
        super(props)

        this.state = {
            stops: [],
            date: [],
            minDate: [],
            travelTimes: []
        }

    }

    componentDidUpdate(prevProps, prevState){

        if(this.props.show == true && this.state.date.length === 0){
            //set initial state for date
            this.setInitialDate()

            //add listener to input
            this.stopInput = document.getElementById('stopLocation');
            this.autocompleteStop = new window.google.maps.places.Autocomplete(this.stopInput);
            window.google.maps.event.addListener(this.autocompleteStop, 'place_changed', this.handlePlacesStopSelect)
            //get inital travel times
            this.getTravelTimes()
        }

        if(this.props.show && this.props.start !== prevProps.start || this.props.end !== prevProps.end){
            this.setInitialState()
        }

        if(this.props.show && prevState.stops != this.state.stops){
            //on remove or reorder get travel times
            this.getTravelTimes()
        }

    }

    setInitialState = () => {
        this.setState({
            stops: [],
            minDate: [],
            travelTimes: [],
        })
    }

    setInitialDate = () => {
        this.setState({
            date: [new Date()]
        })
    }

    getTravelTimes = () => {
        //get travel times
        var data = [this.props.start, ...this.state.stops, this.props.end].map(trip => {
            return {
                lat: trip.lat,
                long: trip.lng,
            }
        })
        axios.post("/api/Directions/Times", data)
        .then(res => {
            const times = res.data.map(time => {
                return time.time
            });
            this.setState({travelTimes: times})
            this.determineTravelTimes()
        }).catch(err => {
            console.log(err)
        })
    }

    determineTravelTimes = () => {
        //for each travel time, determine exact arrival time
        var timeOffset = 0
        var arrivalTimes = this.state.date.map((date, index) => {
            if(index < this.state.travelTimes.length){
                timeOffset += this.state.travelTimes[index] * 1000
                var dateObj = new Date();
                return new Date(dateObj.getTime() + timeOffset)
            }
        })
        this.setState({minDate: arrivalTimes})
    }

    handlePlacesStopSelect = () => {

        var placeStop = this.autocompleteStop.getPlace();

        //format the stop and create new date object
        var data = {lat: placeStop.geometry.location.lat(), lng: placeStop.geometry.location.lng(), name: placeStop.name}
        var date = data ? new Date() : null
        
        this.setState(prevState => ({
            stops: [...prevState.stops, data],
            date: [...prevState.date, date]
        }))

        this.stopInput.value = ""
    }

    handlePlacesRemove = (index) => {
        this.setState(function(prevState){
            //remove single stop at index
            prevState.stops.splice(index, 1)
            return{
                stops: prevState.stops
            }
        })
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({stops}) => ({
          stops: arrayMove(stops, oldIndex, newIndex),
        }));
    };

    onSubmit = () => {

        console.log(this.validateRoute())
        if(this.validateRoute()){
            return this.props.callback([this.props.start, ...this.state.stops, this.props.end], this.state.date)
        } else {
            alert("Your trip cannot be longer than 6 days, and each leg (arrival - departure) cannot be longer than 36 hours.")
        }
    }

    validateRoute = () => {
        let tripLength = this.state.minDate[this.state.minDate.length] - this.state.date[0] 
        //one week limit due to weather API
        if(Math.floor(tripLength/(1000 * 60 * 60 * 24)) > 6){
            return false
        }

        return this.state.date.every((date, index) => {
            let difference = this.state.minDate[index] - date
            //day and a half between
            return Math.floor(difference/(1000 * 60 * 60)) < 36
        })
    }

    handleDate = (dateItem, index) => {

        this.setState(({date}) => ({
            date: date.map((item, i) => {
                //if index == i, return inputted date, else return orig item
                if(i === index){
                    return dateItem;
                }else {
                    return item;
                }
            })
        }))
        //on date change get travel times
        this.getTravelTimes()
    }


    render(){
        return(
            <TripStopsModal show = {this.props.show} hide={this.props.hide} submit={this.onSubmit}>
                <RouteDataView
                    start={this.props.start}
                    end={this.props.end}
                    stops={this.state.stops}
                    onSortEnd={this.onSortEnd}
                    handlePlacesRemove={this.handlePlacesRemove}
                    date={this.state.date}
                    minDate={this.state.minDate}
                    handleDate={this.handleDate}
                />                     
            </TripStopsModal>
        )
    }
}

export default TripStopsContainer