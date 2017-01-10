/**
 * Menu Contents
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

// /* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ART,
} from 'react-native'

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

// // Screens
import StyleGuide from '../screens/style.guide'
import ComingSoon from '../screens/soon'               // **
import FormExample from '../screens/forms'             // **
import ListViewExample from '../screens/listview'      // **
import Tabs from '../screens/tabs'                     // **

const {
  Surface,
  Group,
  Shape,
} = ART;
/* Component ==================================================================== */
class Menu extends Component {
  constructor() {
    super();
    // Initial state
    this.state = {
      menu: [
        {title: 'Home', component: ComingSoon, props: {passProps: {placeholder: 'Hey there, you passProps bro?'}}},
        {title: 'Research', component: StyleGuide},
        {title: 'Filters', component: Tabs}, 
        {title: 'Find Filters', component: ListViewExample},
        {title: 'Login', component: FormExample},
        {title: 'Settings', component: ListViewExample, props: {passProps: {noImages: true}}},
      ],
    };
  }

  static propTypes = {
    navigate: React.PropTypes.func.isRequired,
  }

  /**
    * RENDER
    */
  render = () => {
    let { navigate } = this.props;
    let { menu } = this.state;

    // Build the actual Menu Items
    let menuItems = [];
    menu.map((item)=>{
      let { title, component, props } = item;

      menuItems.push(
        <TouchableOpacity key={'menu-item-'+title}
          onPress={()=>navigate(title, component, props)}>
          <View style={[styles.menuItem]}>
            <Text style={[AppStyles.baseText, styles.menuItem_text]}>{title}</Text>
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <View style={[styles.menuContainer]}>
        <View style={[styles.menu]}>{menuItems}</View>
      </View>
    );
  }
}


/* Styles ==================================================================== */
const styles = StyleSheet.create({
  menuContainer: {
    left: 0,
    right: 0,
    backgroundColor: "#111111",
  },
  menu: {
    left: 0,
    right: 0,
    height: AppConfig.windowHeight,
    backgroundColor: "#111111",
    padding: 20,
    paddingTop: AppConfig.statusBarHeight,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingBottom: 10,
  },
  menuItem_text: {
    fontSize: 18,
    lineHeight: parseInt(18 + (18 * 0.5)),
    fontWeight: '500',
    marginTop: 10,
    color: "#EEE"
  },
});

// /* Export Component ==================================================================== */
export default Menu
