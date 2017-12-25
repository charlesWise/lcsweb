'use strict';
var React = require('react');

module.exports = class Scene extends React.Component{
    constructor(...props){
        super(...props);
    }
    render(){
        var style = {
            ...this.props.style,
            height:'100%',
            width:'100%',
            position:'relative',
            overflow:'hidden'
        }
        return <div style = {style}>{this.props.children}</div>
    }
}