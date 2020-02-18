import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

class UserInfo extends Component {

    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="mr-3">
                <div className="text-white mb-2">Hello! {this.props.name ? this.props.name : ""}</div>
                <Button onClick={this.props.logout}>Logout</Button>
            </div>
        )
    }
}

export default UserInfo;