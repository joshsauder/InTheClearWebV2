import React, {Component} from 'react'
import {Card, Button} from 'react-bootstrap'
import LoginContainer from './loginContainer'
import Axios from 'axios';
import "../style/login.css"
import * as firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {options} from '../services/authSetup';
import { connect } from 'react-redux'
import {setLoginInfo} from '../actions'

class Login extends Component {

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
            paid: false,
            id: attributes.uid
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
                // if(res.data.paid == false){
                //     firebase.auth().currentUser.delete()
                // }
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
                        <Card.Header className="headerFont">Login</Card.Header>
                        <Card.Body>
                            <StyledFirebaseAuth uiConfig={options} firebaseAuth={firebase.auth()} />
                        </Card.Body>
                    </Card>
                </div>
            </div>
            </LoginContainer>
        )
    }
} 

export default connect()(Login)