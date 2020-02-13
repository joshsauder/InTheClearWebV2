import React, {Component} from 'react'
import {Card, Button} from 'react-bootstrap'
import LoginContainer from './loginContainer'
import Axios from 'axios';
import "../style/login.css"
import * as firebase from 'firebase';
import { getGoogleAuth, getAppleAuth } from '../services/authSetup';
import apple from "../images/appleSignIn.png"

class Login extends Component {

    constructor(props){
        super(props)

        this.state = {
            token: ""
        }

    }

    componentDidMount() {

        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                let data = user.providerData
                let name = user.providerData.find(user => user.displayName != null)
                
                //name could be undefined if name is never given
                name ? this.submitNewUser(name) : this.submitNewUser(data[0])
            }
        })
    }

    submitNewUser = (attributes) => {      

        const userObj = {
            displayName: attributes.displayName,
            email: attributes.email,
            paid: false,
            id: attributes.uid
        }

        Axios.post('/api/User/Auth', userObj)
        .then(res => {
            if(res.status == 200){
                //need to implement Redux for User ID and Token
                Axios.defaults.defaults.commons["Authorization"] = this.state.token

                this.props.history.push("/")
            }
        }).catch(err => {
            alert("There was an issue signing you up! Please try again.")
        })
    }

    signInUser = (provider) => {
        firebase.auth().signInWithPopup(provider)
        .then(result => {
            this.setState({token: result.credential.accessToken})
        })
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

export default Login