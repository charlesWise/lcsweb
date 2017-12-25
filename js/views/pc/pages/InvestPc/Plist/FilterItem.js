import React, { Component } from 'react';

export default class FilterItem extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            selected: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selected != this.state.selected) {
            this.state.selected = nextProps.selected;
        }
    }

    _onClick() {
        if (this.state.selected) {
            this.setState({
                selected: false
            })
            this.props.onUnselected && this.props.onUnselected()
        } else {
            this.setState({
                selected: true
            })
            this.props.onSelected && this.props.onSelected()
        }
    }

    _onDelete() {
        this.setState({
            className: ''
        })
    }

    render() {
        return (
            <a href="javascript:;" className={this.state.selected ? 'current' : ''} onClick={this._onClick.bind(this)}>{this.props.label}</a>
        )
    }
}