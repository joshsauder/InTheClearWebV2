import React, {Component} from 'react'
import LoginContainer from './loginContainer'
import Axios from 'axios';
import "../style/login.css"
import firebase from 'firebase/app'
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {options} from '../services/authSetup';
import { connect } from 'react-redux'
import {setLoginInfo} from '../actions'

export class Login extends Component {

    constructor(props){
        super(props)

    }

    componentDidMount() {

        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                let data = user.providerData
                //display name may not be shown with apple sign in
                let name = user.providerData.find(user => user.displayName != null)
                
                user.getIdToken().then(token => {
                    //name could be undefined if name is never given
                    name ? this.submitNewUser(name, token) : this.submitNewUser(data[0], token)
                })
            }
        })
    }

    submitNewUser = (attributes, token) => {      

        const userObj = {
            displayName: attributes.displayName,
            email: attributes.email,
            paid: false
        }

        //Set Auth Token as Global
        Axios.defaults.headers.common['Authorization'] = "Bearer " + token
        
        Axios.post('/api/User/Auth', userObj)
        .then(res => {
            if(res.status == 200){
                //send to redux
                this.props.dispatch(setLoginInfo(res.data))
                this.props.history.push("/")
                
                //if current user is not paid, remove from firebase
                //cost saving...
                if(res.data.paid == false){
                    firebase.auth().currentUser.delete()
                }
            }
        }).catch(err => {
            alert("There was an issue signing you up! Please try again.")
        })
    }


    render(){

        return(
            <LoginContainer>
            <div className="row">
                <div className="col-12 my-auto">
                    <div className="row justify-content-center">
                        <h2 className="text-purple">Welcome Back :)</h2>
                    </div>
                    <div className="row justify-content-center">
                        <div className="text-purple">Please login using either Apple or Google to continue.</div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="text-purple">And as always, happy travels!   &#128663;</div>
                    </div>
                    <div className="row justify-content-center">
                        <StyledFirebaseAuth uiConfig={options} firebaseAuth={firebase.auth()} />
                    </div>
                </div>
            </div>
            </LoginContainer>
        )
    }
} 

export default connect()(Login)