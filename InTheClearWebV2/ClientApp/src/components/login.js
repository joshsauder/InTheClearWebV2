/* global gapi */
/* global AppleID */

import React, {Component} from 'react'
import {Card, Button} from 'react-bootstrap'
import LoginContainer from './loginContainer'
import Axios from 'axios';
import "../style/login.css"
import validator from 'validator'

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
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': (user) => {this.onSignIn(user)},
        });

        AppleID.auth.init({
            clientId : 'com.intheclear.birdhouseWeb',
            scope : 'name email',
            redirectURI: 'http://ec2-52-206-198-221.compute-1.amazonaws.com/api/user/auth/apple',
            state : 'state'
        });
    }

    handleInputChange = (event) => {
        const target = event.target
        this.setState({
            [target.name]: target.value
        })
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

    submitNewUser = (event) => {
        event.preventDefault();

        if(!this.validateInputs()){
            alert("Invalid Credentials.")
            return
        }        

        const userObj = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            email: this.state.email,
            paid: false
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

    onSignIn(googleUser) {

        const token = googleUser.getAuthResponse().id_token

        Axios.post(`api/user/auth/google?token=${token}&paid=false`, {withCredentials: true})
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

    validateInputs = () => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
        if(validator.isEmail(this.state.email) && this.state.password.match(regex)){
            return true
        }
        return false
    }

    render(){

        let handleNewUser = (event, bool) => {
            event.preventDefault()
            this.setState({login: bool})
        }

        return(
            <LoginContainer>
            <div className="container">
                <div className="row justify-content-md-center mt-4">
                    <Card className="col-5" style={{maxHeight: '60vh'}}>
                        <Card.Header className="headerFont">{this.state.login ? "Login" : "Register"}</Card.Header>
                        <Card.Body>
                            <div id="my-signin2" className="mb-2 d-flex justify-content-center" />
                            <div id="appleid-signin" className="signin-button mb-2 mx-auto " data-color="black" data-border="true" data-type="sign in" />
                            {this.state.login ?
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input name="email" className="form-control" value={this.state.email} onChange={this.handleInputChange} required></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input name="password" type="password" className="form-control" value={this.state.password} onChange={this.handleInputChange} required></input>
                                    </div>
                                    <Button type="submit">Submit</Button>
                                    <Button type="button" onClick={(e) => handleNewUser(e, false)} className="ml-2">Register</Button>
                                </form>
                                :
                                <form onSubmit={this.submitNewUser}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Adress</label>
                                        <input name="email" className="form-control" value={this.state.email} onChange={this.handleInputChange} required></input>
                                        <small className="form-text">We will never share nor spam your Email Address</small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}" className="form-control" value={this.state.password} onChange={this.handleInputChange} required></input>
                                        <small className="form-text">Must contain at least one uppercase letter, lowercase letter, and one number </small>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="firstName">First Name</label>
                                            <input name="firstName" className="form-control" value={this.state.firstName} onChange={this.handleInputChange} required></input>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input name="lastName" className="form-control" value={this.state.lastName} onChange={this.handleInputChange} required></input>
                                        </div>
                                    </div>
                                    <Button type="submit">Submit</Button>
                                    <Button type="button" onClick={(e) => handleNewUser(e, true)} className="ml-2">Login</Button>
                                </form>
                            }
                        </Card.Body>
                    </Card>
                </div>
            </div>
            </LoginContainer>
        )
    }
} 

export default Login