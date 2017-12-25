import React, { Component } from 'react';

import FilterItem from './FilterItem';

export default class FilterList extends Component {
    constructor(...props) {
        super(...props);
        this.state = {}
    }
    render() {
        return (
            <li>
                <span className="list-name">{this.props.label}:</span>
                <span className="span-list">
                    {
                        this.props.children
                    }
                </span>
            </li>
        )
    }
}