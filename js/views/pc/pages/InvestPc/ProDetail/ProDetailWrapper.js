import React, {Component} from 'react';

import ProDetailTabs from "./ProDetailTabs";
import ProInformation from "./ProInformation";
import ProHighlights from "./ProHighlights";
import ProDanger from "./ProDanger";
import ProDatum from "./ProDatum";
import ProVideo from "./ProVideo";


export default class ProDetailWrapper extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            tabIndex: 0,
            detail: {}
        }
    }

    _onTabClick(index){
        this.setState({
            tabIndex: index
        })
    }
    
    render() {
        return (
            <div className="detail-cont">
                <ProDetailTabs onClick={this._onTabClick.bind(this)} detailInfo={this.props.detailInfo} />
                {this.state.tabIndex == 0 && <ProInformation  detailInfo={this.props.detailInfo}/>}
                {this.state.tabIndex == 1 && <ProHighlights  detailInfo={this.props.detailInfo}/>}
                {this.state.tabIndex == 2 && <ProDanger  detailInfo={this.props.detailInfo}/>}
                {this.state.tabIndex == 3 && <ProDatum  detailInfo={this.props.detailInfo}/>}
                {this.state.tabIndex == 4 && <ProVideo  detailInfo={this.props.detailInfo}/>}
            </div>
        )
    }
}