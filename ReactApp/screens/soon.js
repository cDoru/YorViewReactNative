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
  Switch,
  Item,
} from 'react-native'

//auth0 imports
import Auth0Lock from 'react-native-lock';
import credentials from './credentials/auth0-credentials';
const lock = new Auth0Lock(credentials);

import AppStyles from '../styles'


//realm
const Realm = require('realm');
const PersonSchema = {
  name: 'Person',
  primaryKey: 'userId',
  properties: {
    userId:  'string',
    name: 'string',
    notifications: {type: 'bool', default: false},
    public: {type: 'bool', default: false},
    pro: {type: 'bool', default: false}
  }
};
let realm = new Realm({schema: [PersonSchema]});


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
    }
  }

  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    showSplashScreen: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
  }

    _login = () => {
    lock.show({
    }, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      //we will put Realm Here!     
        this.props.dispatch(addData(profile));
        this.setState({'loggedIn': true});
        const users = realm.objects('Person');
        console.log("There are " +users.length +" many users right now on this phone.");
        let thisUser = users.filtered('userId CONTAINS[c] $0', this.props.profile.profile.userId);
        if (thisUser.length) { 
            console.log(thisUser[0].name +" is logged in.");
            if (thisUser[0].public === true) {
              this.setState({publicSwitch: true})
            }
            if (thisUser[0].notifications === true) {
              this.setState({notifySwitch: true})
            }
    
        } else {
          realm.write(() => {
            realm.create('Person', {userId: this.props.profile.profile.userId, name: this.props.profile.profile.name, notifications: false, public: false, pro: false});
            console.log("Created User!");
        });

        }
       
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
  _changePublic = (value) => {
    const users = realm.objects('Person');
    let thisUser = users.filtered('userId CONTAINS[c] $0', this.props.profile.profile.userId);
    realm.write(() => {
 thisUser[0].public = value;
});
    
    this.setState({publicSwitch: value})
  }
  _changeNotifications = (value) => {
    const users = realm.objects('Person');
    let thisUser = users.filtered('userId CONTAINS[c] $0', this.props.profile.profile.userId);
    realm.write(() => {
 thisUser[0].notifications = value;
});
    
    this.setState({notifySwitch: value})
  }
 componentWillMount= () => { 

  if (this.props.profile.profile.userId) {
    const users = realm.objects('Person');
    let thisUser = users.filtered('userId CONTAINS[c] $0', this.props.profile.profile.userId);
    if (thisUser.length) { 
            console.log(thisUser[0].name +" is logged in.");
            if (thisUser[0].public === true) {
              this.setState({publicSwitch: true})
            }
            if (thisUser[0].notifications === true) {
              this.setState({notifySwitch: true})
            }
    
        }
  }



 }

  /**
    * RENDER
    */
  render = () => {
    if (!this.props.profile.profile.userId) {
    return (
      <View style={[AppStyles.container], [AppStyles.paddingHorizontal], {margin: 100}}>      
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
     <View style={[AppStyles.paddingVertical]}></View>
      <View style={[AppStyles.containerCentered]}>
      <View style={[AppStyles.row]}>
      
      <Text style={styles.options}> Notifications</Text>
      <View style={[AppStyles.paddingHorizontal]}></View>
        <Switch
          onValueChange={this._changeNotifications} 
          value={this.state.notifySwitch} />
          </View>
          <View style={[AppStyles.paddingVertical]}></View>
          <View style={[AppStyles.row]}>
          <Text style={styles.options}>Public Profile </Text>
          <View style={[AppStyles.paddingHorizontal]}></View>
        <Switch
          onValueChange={this._changePublic}
          value={this.state.publicSwitch} />
          </View>
      </View>
      <View style={[AppStyles.hr]}></View>
      <Text style={styles.options2}> Upgrade to a Full Membership! 99 &cent;</Text>
  
      
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
    marginTop: 45,
    width: 150,
    borderRadius: 75,
  },
  title: {
    fontSize: 45,
    textAlign: 'center',
    marginTop: 15,
    color: '#000000',
  },
  options: {
    fontSize: 17,
    textAlign: 'center',
    color: '#7F7F7F',
  },
  options2: {
    fontSize: 14,
    textAlign: 'center',
    color: '#B3B3B3',
  }
});
/* Export Component ==================================================================== */
export default connect(mapStateToProps)(ComingSoon)

