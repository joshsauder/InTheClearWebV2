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
            travelTimes: [],
            loadingTimes: false,
            locationRef: undefined
        }
    }
    

    componentDidUpdate(prevProps, prevState){

        if(this.props.show == true && this.state.date.length === 0){
            //set initial date state
            this.setInitialDate()
            //get inital travel times
            this.getTravelTimes()
        }

        if(this.props.show && this.props.trip.startLocation !== prevProps.trip.startLocation || this.props.trip.endLocation !== prevProps.trip.endLocation){
            this.setInitialDate()
            //reset to init state
            this.setInitialState()
        }

        if(this.props.show && prevState.stops != this.state.stops){
            //on remove or reorder get travel times
            this.getTravelTimes()
        }

    }

    setInitialState = () => {
        this.setState({
            stops: this.props.trip.stops,
            minDate: [],
            travelTimes: []
        })
    }

    setInitialDate = () =>{
        let dates = [new Date()]
        for(var i = 0; i < this.props.trip.stops.length; i++){
            dates.push(new Date())
        }
        this.setState({date: dates})
    }

    getTravelTimes = () => {
        this.setState({loadingTimes: true})
        //get travel times
        var data = [this.props.trip.startLocation, ...this.state.stops, this.props.trip.endLocation].map(trip => {
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
            this.setState({travelTimes: times, loadingTimes: false})
            this.determineTravelTimes()
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
        if(this.validateRoute()){
            return this.props.callback(this.state.stops, this.state.date)
        } else {
            alert("Your trip cannot be longer than 6 days, and each leg (arrival - departure) cannot be longer than 48 hours.")
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
            return Math.floor(difference/(1000 * 60 * 60)) < 47
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

    setRef = (ref) => {
        this.stopInput = ref
        //add listener to input
        this.autocompleteStop = new window.google.maps.places.Autocomplete(this.stopInput);
        window.google.maps.event.addListener(this.autocompleteStop, 'place_changed', this.handlePlacesStopSelect)
    }


    render(){
        return(
            <TripStopsModal show = {this.props.show} hide={this.props.hide} submit={this.onSubmit} loading={this.state.loadingTimes}>
                <RouteDataView
                    start={this.props.trip.startLocation}
                    end={this.props.trip.endLocation}
                    stops={this.state.stops}
                    onSortEnd={this.onSortEnd}
                    handlePlacesRemove={this.handlePlacesRemove}
                    date={this.state.date}
                    minDate={this.state.minDate}
                    handleDate={this.handleDate}
                    inputRef={this.setRef}
                />                     
            </TripStopsModal>
        )
    }
}

export default TripStopsContainer