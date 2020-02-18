import React, {component} from 'react';
import '../style/login.css'
import logo from '../images/InTheClearFill.png'
import { Navbar } from 'react-bootstrap';
import MainImage from '../images/undraw_road_sign_mfpo.svg'


const LoginContainer = (props) => {

    return(
        <div>
            <Navbar>
                <Navbar.Brand><img className="img-logo" alt="logo" src={logo}></img></Navbar.Brand>
            </Navbar>
            <div className="row" style={{height: '80vh'}}>
                <div className="col-md-7 col-12 align-self-center text-center">
                    <img src={MainImage} className="img-fluid" alt="Main Image" />
                </div>
                <div className="col-md-5 col-12 align-self-center text-center">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default LoginContainer;