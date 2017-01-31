/**
 * First Load
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    StatusBar,
} from 'react-native'


import Auth0Lock from 'react-native-lock';
var credentials = require('./credentials/auth0-credentials');
var lock = new Auth0Lock(credentials);

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

// Components
import Button from '../components/button'

// Screens
import StyleGuide from './style.guide'
import Portfolio from './forms'
import Home from './soon'

/* Component ==================================================================== */
class FirstLoad extends Component {
    static componentName = 'FirstLoad';

    static propTypes = {
        navigator: React.PropTypes.object.isRequired,
        close: React.PropTypes.func.isRequired,
    }

    /**
     * Navigates to Sign Up
     */
    _navigate = () => {
        this.props.close();

        this.props.navigator.push({
            title: 'Portfolio',
            component: Portfolio,
            index: 1,
        });
    }

    _onLogin = () => {

        lock.show({
            closable: true,
        }, (err, profile, token) => {
            if(err) {
                console.log(err);
                return;
            }
            _navigate();
        });
    }

    render = () => {
        return(
            <View style={[AppStyles.container, styles.containerCover]}>
        <View style={[AppStyles.paddingHorizontal]}>
          <Text style={[AppStyles.baseText, AppStyles.p, AppStyles.centered]}>
            Welcome to YorView!
          </Text>
        
          

          <View style={[AppStyles.row]}>
            
            <Image
          style={{width: 150, height: 150}}
          source={require('../images/YorViewLogo.png')}
        />
         
          </View>
        </View>
      </View>
        );
    }
}


const styles = StyleSheet.create({
    containerCover: {
        marginTop: AppConfig.navbarHeight,
        backgroundColor: "#FFF",
        justifyContent: 'center',
    },
});


export default FirstLoad
