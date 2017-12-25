'use strict'
var React = require('react');

module.exports = class Scene extends React.Component{
    constructor(...props){
        super(...props);
        this._onScrollHandler = (e)=>{
            this._onScroll(e)
        }
    }

    componentDidMount() {
       this.wrapper = ReactDOM.findDOMNode(this.refs.wrapper);
       this.wrapper.addEventListener('scroll',this._onScrollHandler,false);
    }
    componentWillUnmount() {
        
        this.wrapper.removeEventListener('scroll',this._onScrollHandler,false);
    }
    
    _onScroll(e){
        this.props.onScroll&&this.props.onScroll(e);
    }

    render(){
        var style = Object.assign({height:'100%',
            width:'100%',
            position:'relative',
            overflow:'auto'},{...this.props.style});
        return <div {...this.props} style = {style} ref = 'wrapper'>{this.props.children}</div>
    }
}