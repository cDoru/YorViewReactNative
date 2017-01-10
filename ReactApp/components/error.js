'use strict';
import React, { Component } from 'react'
import { 
  View, 
  Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import AppStyles from '../styles'
import AppConfig from '../config'

/* Component ==================================================================== */
class Error extends Component {
  render = () => {
    var text = this.props.text || 'Woops, Something went wrong.';

    return (
      <View style={[AppStyles.container, AppStyles.containerCentered]}>
        <Icon name={'ios-alert-outline'} size={50} color={"#CCC"} />

        <View style={[AppStyles.spacer_10]} />

        <Text style={[AppStyles.baseText]}>{text}</Text>
      </View>
    );
  }
}

/* Export Component ==================================================================== */
export default Error