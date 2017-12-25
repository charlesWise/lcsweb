'use strict'
//关于我们左边菜单
import React from 'react';
import AboutUs from './content/AboutUs';
import Help from './content/Help';
import Institution2 from './content/Institution2';
import ContactUs from './content/ContactUs';
import Notice from './content/Notice';
import Activity from './content/Activity';
import MediaReport from './content/MediaReport';
import Partner from './content/Partner';
import News from './content/News';
import Movie from './content/Movie';

const Views = [
    AboutUs,
    Help,
    ContactUs,
    Notice,
    Activity,
    MediaReport,
    Partner,
    News,
    Movie
]

export default class Content extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {

        }
    }

    render(){
        let Child = Views[this.props.curIndex];
        return <Child  showMovie={this.props.showMovie}></Child>
    }
}
