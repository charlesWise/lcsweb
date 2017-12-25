'use strict'
//合同申请
import React from 'react';
import Nav from '../../AboutUs/content/Nav';
import ApplyContract from './ApplyContract';
import ApplyRecord from './ApplyRecord';

export default class ApplyWrapper extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {
            curIndex: 0
        }
    }

    _onSelected(index) {
        this.setState({
            curIndex: index
        })
    }

    render() {
        return (
            <div className="user-right">
                <div className="UploadAvatar">
                    <ul className="about_nav">
                        <li className={this.state.curIndex == 0 ? 'current' : ''} onClick={this._onSelected.bind(this, 0)}>
                            <a><span>{'合同申请'}</span></a>
                        </li>
                        <li className={this.state.curIndex == 1 ? 'current' : ''} onClick={this._onSelected.bind(this, 1)}>
                            <a><span>{'申请记录'}</span></a>
                        </li>
                    </ul>
                    {
                        this.state.curIndex == 0 ? <ApplyContract /> : <ApplyRecord />
                    }
                </div>
            </div>
        )
    }
}
