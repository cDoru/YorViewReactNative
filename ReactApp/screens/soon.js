/*
 Becomes Home Component
 */
'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import { connect } from 'react-redux'
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

import { addData } from '../actions/profile'

import Button from '../components/button'
import FirstLoad from './first.load'

function mapStateToProps(state) {
  return { profile: state.profileReducer };
}

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

     
        this.props.dispatch(addData(profile));
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
    if (!this.props.profile.profile.userId) {
    return (
      <View style={[AppStyles.container], [AppStyles.paddingHorizontal], {margin: 40}}>      
        <Button
                text={'Login'}
                type={'outlined'}
                onPress={this._login} />            
      </View>
    )}
    else if (this.props.profile.profile.userId !== undefined) {
      return (
      <View style={[AppStyles.container], [AppStyles.paddingHorizontal], {margin: 40}}>      
        
          
          <Image
            style={styles.avatar}
            source={{uri: (this.props.profile.profile.userId).substring(0,1) == 'f' ? "https://graph.facebook.com/"+(this.props.profile.profile.userId).replace('facebook|','') +"/picture?width=9999" : this.props.profile.profile.picture}}
          />
          <Text style={styles.title}>{(this.props.profile.profile.name).includes('@') ? 'Welcome!' : "Welcome, " +(this.props.profile.profile.name).split(' ')[0]+"!"}</Text>
     
      

      
      </View>
    )}
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#15204C',
  },
  messageBox: {
    flex: 1,
    justifyContent: 'center',
  },
  badge: {
    alignSelf: 'center',
    height: 110,
    width: 102,
    marginBottom: 80,
  },
  avatar: {
    alignSelf: 'center',
    height: 150,
    marginTop: 75,
    width: 150,
    borderRadius: 75,
  },
  title: {
    fontSize: 45,
    textAlign: 'center',
    marginTop: 20,
    color: '#000000',
  },
});
/* Export Component ==================================================================== */
export default connect(mapStateToProps)(ComingSoon)

