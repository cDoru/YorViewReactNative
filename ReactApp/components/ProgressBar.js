'use strict';

import React, { Component } from 'react'
import {
    View,
    Text,

} from 'react-native'

import AppStyles from '../styles'

class ProgressBar extends Component {
    static propTypes = {
        text: React.PropTypes.string,
        value: React.PropTypes.number,
        color: React.PropTypes.string,
    }
    render = () => {
    	let { text, value, color} = this.props;
        return(
            <View style={[AppStyles.containerCentered]}>
  			{text && <Text style={[AppStyles.p]}> {text} </Text> }
			
			<View style={{width: 175, height: 10, borderRadius: 10, marginTop: 10, backgroundColor: '#E6E6E6'}}>
			{value, color && <View style={{width: value, height: 10, borderRadius: 10, backgroundColor: color}}>
</View>}
</View>

  			</View>
        );
    }
}

export default ProgressBar