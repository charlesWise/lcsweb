'use strict'
import React from 'react';
import Menu from './Menu';
import Content from './Content';
import Header from '../Index/Header';
import Footer from '../Index/Footer';
import Feedback from './Feedback';
import Play from './content/Play';
import Location from 'util/Location';

class Index extends React.Component{
    constructor(...props){
        super(...props);
        this.state = {
            isShowMovie:false,
            movieSource:'',
            posterImg:'',
            curIndex:0
        }
    }

    componentWillMount(){
        
    }

    componentDidMount(){
        let type = parseInt(Location.queryString('type'))||0;
        if(type){
            this.setState({
                curIndex: type
            })
        }
    }

    showMovie(movieSource,posterImg){
        this.setState({
            isShowMovie:true,
            movieSource:movieSource,
            posterImg:posterImg
        })
    }

    close(){
        this.setState({
            isShowMovie:false
        })
    }

    render(){
        return <div className="about_page">
                <Header></Header>
                <img src={'./images/aboutUs/mansion.png'} className="banner"></img>
                <div className="wrapper">
                    <Menu curIndex={this.state.curIndex}/>
                    <Content curIndex={this.state.curIndex} showMovie={this.showMovie.bind(this)}/>
                </div>
                <Footer></Footer>
                <Play ref="play" isShowMovie={this.state.isShowMovie} close={this.close.bind(this)} movieSource={this.state.movieSource} posterImg={this.state.posterImg}/>
        </div>
    }
}

AppRegister.register(<Index />);