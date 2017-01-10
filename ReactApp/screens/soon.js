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


import AppStyles from '../styles'

import Button from '../components/button'
import FirstLoad from './first.load'

class ComingSoon extends Component {
  static componentName = 'ComingSoon';

  constructor(props) {
    super(props);

    this.state = {
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
    let header = 'My Portfolio'
    let subHeader = 'Yorview: Knowledge is a Journey'
    let directions = 'The World of Finance is changing. More people are now entrusting their savings to automated systems. '
    let motto = 'We believe that the best strategy combines three things: personalized service, reasonable autonomy, and cutting edge computational techniques.'
    // Done
    return (
      <View style={[AppStyles.container], [AppStyles.paddingHorizontal], {margin: 20}}>
        <Text style={[AppStyles.h1]}>
          {header}
        </Text>    
        <Text style={[AppStyles.h2], {color: '#666666'}}>
            {subHeader}
        </Text>
        <View style={[AppStyles.spacer_25]}>
          <Text style={[AppStyles.p], [AppStyles.paddingHorizontal], {color: 'black'}}>
            {directions}
        </Text>
        <View style={[AppStyles.spacer_15]} />
        <Text style={[AppStyles.p], [AppStyles.paddingHorizontal], {color: 'black'}}>
            {motto}           
        </Text>        
        </View>
        <Modal animationType={'fade'}
          transparent={false}
          visible={this.state.splashScreenVisible}
          onRequestClose={()=>{}}>
          <FirstLoad navigator={this.props.navigator}
            close={this.onSplashSkip} />
        </Modal>
      </View>
    );
  }
}

/* Export Component ==================================================================== */
export default ComingSoon
