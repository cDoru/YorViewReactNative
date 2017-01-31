import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native'

import AppStyles from '../styles'

class StyleGuide extends Component {
  static componentName = 'StyleGuide';
  constructor(props) {
    super(props);

  }
   render() {
    return (
      <ScrollView>
      <Text style={[AppStyles.h4B]}> component Coming Soon </Text>
      </ScrollView>
    )};
  }

export default StyleGuide