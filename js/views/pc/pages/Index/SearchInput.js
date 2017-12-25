import React, { Component } from 'react';
import Http from './../../../../controller/pcapi';

export default class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocus: false,
            list: []
        }
    }

    // _onFocus() {
    //     this.setState({
    //         isFocus: true
    //     })
    // }

    // _onBlur() {
    //     this.setState({
    //         isFocus: false
    //     })
    // }

    _handleInput(){
        let fund_name = this.refs.input.value;
        if(!fund_name) {
            this.setState({
                list: []
            })
            return;
        }else{
            this.setState({
                fund_name: fund_name
            })
        }
        Http.searchFund({
            fund_name: fund_name
        }).success((data, next) => {
            if(data.boolen==1){
                data = data.data || {}
                this.setState({
                    list: data.rows || []
                })
            }
        })
    }

    render() {
        return (
            <div className="search-m">
                <p>
                    <input
                        ref='input'
                        className="search-input active"
                        placeholder="请输入产品名称"
                        // onChange={this._handleInput.bind(this)}
                        // onFocus={this._onFocus.bind(this)}
                        // onBlur={this._onBlur.bind(this)}
                    />
                    <i className="search-icon" onClick={this._handleInput.bind(this)}></i>
                </p>

                {
                    this.state.fund_name && this.state.list.length < 1 &&
                    <ul>
                        <li>
                            <div className="search-item">暂无相关产品</div>
                        </li>
                    </ul>
                }

                {
                    this.state.list.length > 0 &&
                    <ul>
                        {
                            this.state.fund_name && this.state.list && this.state.list.length > 0 &&
                            this.state.list.map((item,index)=>{
                                return (
                                    <li key={index}>
                                        <div className="search-item"><a href={"/prodetail.html?fid=" + item.fund_id}>{item.fund_name}</a></div>
                                        {/* <div className="search-del"></div> */}
                                    </li>
                                )
                            })
                            
                        }
                    </ul>
                }

            </div>
        )
    }
}