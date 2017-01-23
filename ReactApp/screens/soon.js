/*
 Becomes Home Component
 */
'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  Picker,
  Item,
} from 'react-native'

import Auth0Lock from 'react-native-lock';
var credentials = require('./credentials/auth0-credentials');
var lock = new Auth0Lock(credentials);

import AppStyles from '../styles'

import Button from '../components/button'
import FirstLoad from './first.load'

class ComingSoon extends Component {
  static componentName = 'ComingSoon';

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      splashScreenVisible: this.props.showSplashScreen || false,
    selected1: 'key1',
    selected2: 'key1',
    selected3: 'key1',
    }
  }

  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    showSplashScreen: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
  }

  /**
    * Navigates to same scene (for Demo purposes)
    */
    _login = () => {
    lock.show({
    }, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
        this.setState({'loggedIn': true});
    });
  }
  _navigate = (navbarTitle) => {
    this.props.navigator.push({
      title: navbarTitle,
      component: ComingSoon,
      index: 2
    });
  }

  /**
    * Splash Screen - Skip
    */
  onSplashSkip = () => {
    this.setState({ splashScreenVisible: false })
  }
   onValueChange = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  };

  /**
    * RENDER
    */
  render = () => {
    if (!this.state.loggedIn) {
    return (
      <View style={[AppStyles.container], [AppStyles.paddingHorizontal], {margin: 40}}>      
        <Button
                text={'Login'}
                type={'outlined'}
                onPress={this._login} />            
      </View>
    )}
    else if (this.state.loggedIn === true) {
      return (
      <View style={[AppStyles.container], [AppStyles.paddingHorizontal], {margin: 40}}>      
        <Text> Great </Text>         
      </View>
    )}
  }
}

/* Export Component ==================================================================== */
export default ComingSoon
