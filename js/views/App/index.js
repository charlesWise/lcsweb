'use strict'
import React, {
    Component
} from 'react';

import {
    Navigator,
    Scene,
    Toast,
    Header
} from 'widget'

import StoreMap from './../../stores';
import Mlux from 'mlux';
function getUrl(url){
    return url.split('#')[1];
}
window.addEventListener('hashchange',function(e){
    var fromUrl = getUrl(e.oldURL);
    var url = getUrl(e.newURL);
    APPContext.fromUrl =fromUrl;
    APPContext.url = url;
},false)
export default class App extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            inited: false
        }
        window.APPContext = this;
    }
    _renderScene(route, props) {
        var Component = route.component;
        this.history = props.history;
        return <Scene>
            <Component {...props} />
        </Scene>
    }
    
    componentWillMount() {
        Mlux.StoreManager.load(StoreMap).then(() => {
            this.setState({ inited: true });
        })
    }

    componentDidMount() {
    }
    render() {
        var routeMap = this.props.routeMap;
        if (!this.state.inited) {
            return null;
        }
        return <div style={styles.container}>
            <Navigator
                routeMap={routeMap}
                initialRoute={routeMap.home}
                renderScene={(...args) => this._renderScene(...args)}
                sceneStyle={styles.sceneStyle} />
            <Toast ref={(v) => this.Toast = v} style={styles.toast}></Toast>
        </div>
    }
}
var styles = {
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        position: 'relative',
    },
    sceneStyle: {
        position: 'absolute',
        overflow: 'hidden',
        top: 0,
        backgroundColor: '#feeefe',
        height: '100%',
        width: '100%',
    },
    toast: {
        borderRadius: '5px',
    }
}