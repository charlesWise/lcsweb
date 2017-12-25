import React, { Component } from 'react';

import ProvinceTableUser from './../../../../../../res/ProvinceTable-User';
import ProvinceTableBank from './../../../../../../res/ProvinceTable-Bank';
var tables;

function createItem(keys, values) {
    let item = {};
    keys.forEach((v, i) => {
        item[v] = values[i];
    })
    return item;
}

function createProvinceItem(values) {
    return createItem(['id', 'value'], values);
}

function createCityItem(values) {
    return createItem(['id', 'value', 'provinceCode'], values);
}

function parseNames(names) {
    var values = [];
    var province = tables.province, city, area;
    values[0] = province[0].value;
    for (var o in province) {
        if (province[o].value.indexOf(names[0]) != -1) {
            values[0] = province[o].value;
            break;
        }
    }
    city = tables.city[getCode(values[0])];
    values[1] = city[0].value;
    for (var o in city) {
        if (city[o].value.indexOf(names[1]) != -1) {
            values[1] = city[o].value;
            break;
        }
    }
    return values;
}

function getCode(value) {
    return value.slice(0, value.indexOf('-'));
}

function getName(value) {
    return value && value.slice(value.indexOf('-') + 1);
}

export default class AreaSelect extends Component {
    constructor(...props) {
        super(...props);
        if (!tables) {
            // if (this.props.usage == 'bank') {
            //     var {
            //         province,
            //         city,
            //     } = ProvinceTableUser;
            // } else {
                var {
                    province,
                    city,
                } = ProvinceTableBank;
            // }
            tables = {
                province: [],
                city: {},
            };
            province.forEach((v) => {
                var values = [v[0], v[1] + '-' + v[2]]
                tables.province.push(createProvinceItem(values));
            });
            city.forEach((v, i) => {
                let province = v[3];
                var values = [v[0], v[1] + '-' + v[2], v[3]]
                tables.city[province] = tables.city[province] || [];
                tables.city[province].push(createCityItem(values));
            });
        }
        this.state = {

        }
    }

    componentWillMount() {
        this._stateFromProps(this.props);
    }

    _stateFromProps(props) {
        var values = parseNames([props.province, props.city]);
        this.state = {
            p_show:false,
            c_show:false,
            provinceValue: values[0],
            cityValue: values[1],
            province: getName(values[0]),
            city: getName(values[1]),
            provinces: tables.province,
            citys: tables.city[getCode(values[0])],
        }
    }

    _onProvinceClick(value) {
        var citys = tables.city[getCode(value)];
        this.setState({
            p_show: false,
            provinceValue: value,
            cityValue: citys[0].value,
            citys: citys,
            province: getName(value),
            city: getName(citys[0].value)
        })
        this.props.onSelected && this.props.onSelected()
    }

    _onCityClick(value) {
        this.setState({
            c_show: false,
            cityValue: value,
            city: getName(value)
        })
        this.props.onSelected && this.props.onSelected()
    }

    getProvince(){
        return {
            name: this.state.province || '',
            value: this.state.provinceValue || ''
        }
    }

    getCity() {
        return {
            name: this.state.city || '',
            value: this.state.cityValue || ''
        }
    }

    render() {
        return (
            <div>
                <div className="select-region">
                    <div className="sel-inner" onClick={() => { this.setState({ p_show: !this.state.p_show, c_show: false }) }}>
                        {this.state.province ? this.state.province : '请选择'} <i className={this.state.p_show ? "pull" : "drop-down"}></i>
                    </div>
                    <div className={this.state.p_show ? "region" : "region dn" }>
                        <ul>
                            {
                                this.state.provinces.map((v) => {
                                    return (<li key={getCode(v.value)} onClick={this._onProvinceClick.bind(this,v.value)}>{getName(v.value)}</li>);
                                })
                            }
                        </ul>
                    </div>
                </div>
                <em>&nbsp;</em>
                {/* <em>省</em> */}
                <div className="select-region">
                    <div className="sel-inner" onClick={() => { this.setState({ c_show: !this.state.c_show, p_show: false }) }}>
                        {this.state.city ? this.state.city : '请选择'} <i className={this.state.c_show ? "pull" : "drop-down"}></i>
                    </div>
                    <div className={this.state.c_show ? "region" : "region dn"}>
                        <ul>
                            {
                                this.state.citys.map((v) => {
                                    return (<li key={getCode(v.value)} onClick={this._onCityClick.bind(this, v.value)}>{getName(v.value)}</li>);
                                })
                            }
                        </ul>
                    </div>
                </div>
                <em>&nbsp;</em>
                {/* <em>市</em> */}
            </div>
        )
    }
}