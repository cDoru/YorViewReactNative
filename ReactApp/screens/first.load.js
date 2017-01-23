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
	    title: 'Home',
	    component: Home,
	    index: 1,
	  });
	}

  _onLogin = () => {

    lock.show({
      closable: true,
    }, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
        
    });
  }

  /**
    * RENDER
    */
  render = () => {
    return (
      <View style={[AppStyles.container, styles.containerCover]}>
      	<View style={[AppStyles.paddingHorizontal]}>
          <Text style={[AppStyles.baseText, AppStyles.p, AppStyles.centered]}>
            Welcome to YorView!
          </Text>

          <View style={[AppStyles.spacer_10]} />

          <View style={[AppStyles.row]}>
          	 <Button
                text={'Login'}
                type={'outlined'}
                onPress={this._navigate} />
            
      		</View>
      	</View>
      </View>
    );
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
	containerCover: {
		marginTop: AppConfig.navbarHeight,
		backgroundColor: "#FFF",
		justifyContent: 'center',
	},
});

/* Export Component ==================================================================== */
export default FirstLoad
