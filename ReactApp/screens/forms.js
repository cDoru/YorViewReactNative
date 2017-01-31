'use strict';

import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
    TextInput,
    ScrollView,
    AsyncStorage,
    TouchableOpacity,
} from 'react-native'
import FormValidation from 'tcomb-form-native'
import AppStyles from '../styles'
import AppUtil from '../util'
import Button from '../components/button'
import Alerts from '../components/alerts'

class Form extends Component {
    static componentName = 'Form';
    constructor(props) {
        super(props);
    }
    render = () => {
        var Form = FormValidation.form.Form;

        return(
            <ScrollView automaticallyAdjustContentInsets={false}
        ref={'scrollView'}
        style={[AppStyles.container]}
        contentContainerStyle={[AppStyles.containerCentered, styles.container]}>
       
      </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
});
export default Form
