import React, { Component } from 'react';
import Mlux from 'mlux';

// var accessToken = Mlux.StoreManager.AccessToken.get('value');

export default class ValidImg extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            accessToken:''
        }
    }
    componentDidMount(){
        var accessToken = localStorage.getItem('accessToken');
        this.setState({
            accessToken
        })    
    }
    _onClick() {
        this.props.onClick && this.props.onClick()
    }

    render() {
        return (
            <img 
            className="code-img" 
            src={this.props.url + '?t=' + this.props.ts + '&key=' + this.props.keyType + '&access_token=' + this.state.accessToken}
            onClick={this._onClick.bind(this)}/>
        );
    }
}