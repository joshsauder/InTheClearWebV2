/* global gapi */
/* global AppleID */

import React, {Component} from 'react'
import {Card, Button} from 'react-bootstrap'
import LoginContainer from './loginContainer'
import Axios from 'axios';
import "../style/login.css"
import validator from 'validator'

// import Hub
import { Auth, Hub } from 'aws-amplify'

class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            password: "",
            email: "",
            login: true
        }
    }

    componentDidMount() {

        gapi.signin2.render('my-signin2', {
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
        });

        Auth.currentAuthenticatedUser()
        .then(user => {
            console.log(user)
            this.submitNewUser(user.attributes, user.username)
        })
        .catch(() => console.log("Not signed in"));
    }

    onSubmit = (event) => {
        event.preventDefault();
        const loginObj = {
            email: this.state.email, 
            password: this.state.password
        }

        Axios.post('/api/User/Auth', loginObj, {withCredentials: true})
        .then(res => {
            if(res.status == 200){
                //go to main page since access is granted
                Axios.defaults.headers.common["Authorization"] = "bearer " + res.data.token
                Axios.defaults.headers.common["UserId"] = res.data.id
                Axios.defaults.headers.common["Name"] = res.data.firstName

                this.props.history.push('/')
            }
        }).catch(err => {
            alert("Error logging in! Please try again.")
        })   
    }

    submitNewUser = (attributes, username) => {      

        const userObj = {
            firstName: attributes.given_name,
            lastName: attributes.family_name,
            email: attributes.email,
            paid: false,
            id: username
        }

        Axios.post('/api/User', userObj)
        .then(res => {
            if(res.status == 200){
                //show login form
                this.setState({login: true})
            }
        }).catch(err => {
            alert("There was an issue signing you up! Please try again.")
        })
    }


    render(){

        return(
            <LoginContainer>
            <div className="container">
                <div className="row justify-content-md-center mt-4">
                    <Card className="col-5" style={{maxHeight: '60vh'}}>
                        <Card.Header className="headerFont">{this.state.login ? "Login" : "Register"}</Card.Header>
                        <Card.Body>
                            <div id="my-signin2" className="mb-2 d-flex justify-content-center" onClick={() => Auth.federatedSignIn({provider: 'Google'})} />
                        </Card.Body>
                    </Card>
                </div>
            </div>
            </LoginContainer>
        )
    }
} 

export default Login