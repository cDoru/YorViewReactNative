/*
 */
'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  Navigator,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
} from 'react-native'
import { connect } from 'react-redux'
import NavigationBar from 'react-native-navbar'
import SideMenu from 'react-native-side-menu'

//better than Async Storage;
var Realm = require('realm');

const User = {
  name: 'User',
  properties: {
    userId: 'string',
    name: 'string',

  }
};
let realm = new Realm({schema: [User]});


// Actions
import * as SideMenuActions from '../actions/sidemenu'

// App Globals
import AppStyles from '../styles';
import AppConfig from '../config';
import AppUtil from '../util';

// Google Analytics
//import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
//const GoogleAnalytics = new GoogleAnalyticsTracker(AppConfig.gaTrackingId);

// Components
import Menu from '../components/menu';
import NavbarElements from '../components/navbar.elements';

// Screens
import Index from '../screens/soon';

/* Component ==================================================================== */
class AppContainer extends Component {
  /**
    * On first load
    */
  componentDidMount = () => {
    // Status Bar
    StatusBar.setHidden(false); // Slide in on load
    //StatusBar.setBackgroundColor(AppConfig.primaryColor, true); // Android Status Bar Color
    //now add our user to realm  
    if (this.props.profile.profile.userId) {
    //we will put Realm Here!
    let users = realm.objects('User');
    let theirName = this.props.profile.profile.name
    let theirUserId = this.props.profile.profile.userId
    realm.write(() => {
        realm.create('User', {
            userId: theirUserId,
            name: theirName
        });
        let users = realm.objects('User');
        //realm.delete(users);
        console.log("There are " + users.length + " users.")
    });
    console.log(users.slice(0, 5));
}
  }

  /**
    * An option was pressed in the Side Menu. Go to scene...
    */
  _onSideMenuPress = (title, component, extraProps) => {
    // Close menu
    this.props.closeSideMenu();

    if(AppUtil.objIsEmpty(extraProps)) extraProps = {};

    // Change Scene
    this.refs.rootNavigator.replace({
      title: title,
      component: component,
      index: 0,
      ...extraProps
    });
  }

  /**
    * Toggle Side Menu
    */
  _onSideMenuChange = (isOpen) => {
    if (isOpen != this.props.sideMenuIsOpen) {
      this.props.toggleSideMenu();
    }
  }

  /**
    * Render each scene with a Navbar and Sidebar
    */
  _renderScene = (route, navigator) => {
    // Default Navbar Title
    let title = route.title || "My Profile";

    // Google Analytics
    let screenName = route.component.componentName ? route.component.componentName + ' - ' + title : title;
    //GoogleAnalytics.trackScreenView(screenName);

    // Show Hamburger Icon when index is 0, and Back Arrow Icon when index is > 0
    let leftButton = {
      onPress: (route.index > 0)
        ? this.refs.rootNavigator.pop 
        : this.props.toggleSideMenu,
      icon: (route.index > 0)
        ? 'ios-arrow-back-outline'
        : 'ios-menu-outline'
    };

    // Show a cross icon when transition pops from bottom
    if(route.transition == 'FloatFromBottom')  {
      leftButton.icon = 'ios-close-outline';
    }

    return (
      <View style={[AppStyles.appContainer, AppStyles.container]}>
        <NavigationBar
          title={<NavbarElements.Title title={title || null} />}
          statusBar={!this.props.profile.profile.userId ? {style: 'light-content', hidden: true} : {style: 'light-content', hidden: false}}
          style={!this.props.profile.profile.userId ? {backgroundColor: '#FFF'} : {}}
          tintColor={AppConfig.primaryColor}
          leftButton={<NavbarElements.LeftButton onPress={leftButton.onPress} icon={leftButton.icon} />} />

        <route.component navigator={navigator} route={route} {...route.passProps} />
      </View>
    );
  }
  render() {


    return (
      <SideMenu
        ref="rootSidebarMenu"
        menu={<Menu navigate={this._onSideMenuPress} ref="rootSidebarMenuMenu" />}
        disableGestures={this.props.sideMenuGesturesDisabled}
        isOpen={this.props.sideMenuIsOpen}
        onChange={this._onSideMenuChange}>

        <Navigator 
          ref="rootNavigator"
          style={[AppStyles.container, AppStyles.appContainer]}
          renderScene={this._renderScene}
          configureScene={function(route, routeStack) {
            if(route.transition == 'FloatFromBottom') 
              return Navigator.SceneConfigs.FloatFromBottom;
            else
              return Navigator.SceneConfigs.PushFromRight;
          }}
          initialRoute={{
            component: Index,
            index: 0,
            navigator: this.refs.rootNavigator,
            passProps: {
              showSplashScreen: true,
            }
          }} />

      </SideMenu>
    );
  }
}

// Define which part of the state we're passing to this component
const mapStateToProps = (state) => ({
  sideMenuIsOpen: state.sideMenu.isOpen,
  profile: state.profileReducer,
});

// Define the actions this component may dispatch
const mapDispatchToProps = {
  toggleSideMenu: SideMenuActions.toggle,
  closeSideMenu: SideMenuActions.close,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
