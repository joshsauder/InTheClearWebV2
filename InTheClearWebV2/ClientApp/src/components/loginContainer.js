import React, {component} from 'react';
import '../style/login.css'
import logo from '../images/InTheClearFill.png'
import { Navbar, Nav } from 'react-bootstrap';
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
            <Navbar fixed="bottom">
                <Nav>
                    <Nav.Link target="_blank" rel="noopener" href="https://itunes.apple.com/us/app/in-the-clear/id1458058092?ls=1&#38;mt=8">Get The iOS App</Nav.Link>
                    <Nav.Link target="_blank" rel="noopener" href="https://intheclearapp.com/privacy">Terms Of Service</Nav.Link>
                    <Nav.Link target="_blank" rel="noopener" href="https://intheclearapp.com/termsOfService">Privacy Policy</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    )
}

export default LoginContainer;