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
        value2: React.PropTypes.number,
        color: React.PropTypes.string,
    }
    render = () => {
    	let { text, value, value2, color} = this.props;
        return(
            <View style={[AppStyles.containerCentered]}>
  			
			
			{value, value2, color && <View style={{width: 250, height: 16, borderRadius: 20, marginTop: 10, backgroundColor: '#E6E6E6'}}>
			<View style={{width: value, height: 16, borderRadius: 20, backgroundColor: color}}>
<Text style={{color: '#FFFFFF', paddingLeft: 5, backgroundColor: 'transparent', fontSize: 14, borderRadius: 100}}> {(value2).toFixed(2)} </Text>
</View>
</View>}
{text && <Text style={[AppStyles.p]}> {text} </Text> }

  			</View>
        );
    }
}

export default ProgressBar