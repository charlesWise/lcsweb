import React,{Component} from 'react';

import Http from './../controller/pcapi';

export default class Agreement extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            content: ''
        }
    }

    componentDidMount() {
        Http.getAgreement({
            name: 3
        }).success((source, next)=>{
            this.setState({
                content: source.data.content
            })
        })
    }

    render(){
        return (
            <div style={{
                padding: '15px 300px',
                lineHeight: '30px'
            }} dangerouslySetInnerHTML={{
                __html: this.state.content || ''
            }}/>
        );
    }
}

AppRegister.register(<Agreement />);