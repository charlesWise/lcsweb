import React, { Component } from 'react';

export default class FilterTag extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            selected: false
        }
    }

    _onClick(){
        this.setState({
            selected: false
        })
        this.props.onUnselected && this.props.onUnselected()
    }

    render() {
        return (
            <span>{this.props.label}：{this.props.name}<em onClick={this._onClick.bind(this)}><i></i></em></span>
        )
    }
}