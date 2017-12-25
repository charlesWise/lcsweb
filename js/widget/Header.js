'use strict'
var  React = require('react');
var  ReactDOM = require('react-dom');

module.exports = class Header extends React.Component{
    constructor(...props){
        super(...props);
    }
    componentDidMount() {
    }
    _goBack(){
        if(typeof this.props.goBack){
            this.props.goBack()
        }else{
            NXSD.history.goBack();
        }
    }
    render(){
        if(this.props.hide){
            return null;
        }
        return <div  className = 'header'>
           <div className="top" style={{paddingLeft:'2rem'}}>
                <span>{this.props.title}</span>
                <a href="javascript:;" className="return" onClick={()=>this._goBack()}><img src="images/center/return.png" alt=""/></a>
            </div>
        </div>;
    }
}