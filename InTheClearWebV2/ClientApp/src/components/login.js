import React, {Component} from 'react'
import {Card, Button} from 'react-bootstrap'
import LoginContainer from './loginContainer'
import Axios from 'axios';
import "../style/login.css"
import * as firebase from 'firebase';
import { getGoogleAuth, getAppleAuth } from '../services/authSetup';
import { connect } from 'react-redux'
import {setLoginInfo} from '../actions'

import apple from "../images/appleSignIn.png"

class Login extends Component {

    constructor(props){
        super(props)

    }

    componentDidMount() {

        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                let data = user.providerData
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
            paid: false,
            id: attributes.uid
        }

        //Set Auth Token as Global
        Axios.defaults.headers.common['Authorization'] = "Bearer " + token
        
        Axios.post('/api/User/Auth', userObj)
        .then(res => {
            if(res.status == 200){
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

    signInUser = (provider) => {
        firebase.auth().signInWithPopup(provider)
        .catch(function(error) {
            alert("Issue Signing You In!")
            console.log(error);
        });
    }



    render(){

        let googleAuth = getGoogleAuth()
        let appleAuth = getAppleAuth()
        return(
            <LoginContainer>
            <div className="container">
                <div className="row justify-content-md-center mt-4">
                    <Card className="col-5" style={{maxHeight: '60vh'}}>
                        <Card.Header className="headerFont">Login</Card.Header>
                        <Card.Body>
                            <div className="g-signin2 signin-button mb-1" data-width="240" data-height="48" data-longtitle="true" onClick={() => this.signInUser(googleAuth)}>Google Sign In</div>
                            <div onClick={() => this.signInUser(appleAuth)}><img className="signin-button" src={apple}/></div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            </LoginContainer>
        )
    }
} 

export default connect()(Login)