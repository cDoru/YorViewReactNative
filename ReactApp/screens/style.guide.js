/*
Place to research stocks
 */
'use strict';
 
/* Setup ==================================================================== */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  AsyncStorage,
} from 'react-native'

import {StockLine} from 'react-native-pathjs-charts'
import sampleData from './data'

// App Globals
import AppStyles from '../styles'

// Components
import Alerts from '../components/alerts'
import Button from '../components/button'
import ListRow from '../components/list.row'
import Loading from '../components/loading'


//Actions
import { getFund } from '../actions/fundamentalOneAct'
import { getHistorical } from '../actions/getHistorical'
import { trade,incr,decr } from '../actions/trade'



function mapStateToProps(state) {
  return { trade: state.tradeReducer, getFund: state.getFund, getHis: state.getHis };
}
const Stock = require('paths-js/stock')

const year = 365
/* Component ==================================================================== */
class StyleGuide extends Component {
	static componentName = 'StyleGuide';
	constructor(props) {
    super(props);
    this.state = {
    	text: '',
      getFund: 'loading',
      getHis: 'loading',
      chartDone: false,
    }
  }
componentDidMount = async () => {
    let response = await AsyncStorage.getItem('pastStock');
    if (response) {
      this.props.dispatch(getFund(response));
      this.props.dispatch(getHistorical(response, year));   
    }
    else {
    this.props.dispatch(getFund('aapl'));
    this.props.dispatch(getHistorical('aapl', year));

  }
}

 _changeAmount = () => {
    let adding = Math.round(this.state.font) * this.props.getFund.stocks.data.quotes.quote.last - 0.95;
    this.props.dispatch(incr(adding)); 
    Alert.alert("You have sold " +this.state.font +" stocks for $" +adding.toFixed(2));
  }
  _delAmount = () => {
    let subtract = Math.round(this.state.font) * this.props.getFund.stocks.data.quotes.quote.last + 0.95;
    this.props.dispatch(decr(subtract));
    Alert.alert("You have bought " +this.state.font +" stocks for $" +subtract.toFixed(2));
  }

getNewData () {
  var stock = this.state.text.trim();
  if (stock !== '') {
  AsyncStorage.setItem('pastStock', stock);
  this.props.dispatch(getFund(stock));
  this.props.dispatch(getHistorical(stock, year));
  this.setState({text: ''})
}
}

   render() {
    const stockLine = <StockLine data={this.props.getHis.past.history ? [this.props.getHis.past.history] : sampleData.stockLine.data} options={sampleData.stockLine.options} xKey='x' yKey='y' />
    if (!this.props.getFund.stocks.data) {
      return (
        <View style={[AppStyles.containerCentered]}>
        <Text style={[AppStyles.h4]}> Loading </Text>
        </View>
        )
    }
    else if (this.props.getFund.stocks.data.quotes.quote.name === 'NA') {
       return (
       <View style={[AppStyles.containerCentered]}>
       <TextInput
          ref="1"
          style={{height: 45, borderColor: '#666666', borderWidth: 2, marginTop: 10, padding: 15, backgroundColor: '#FFFFFF',borderRadius: 10}}
          placeholder="Enter Stock Symbol Here"
          returnKeyType="search"
          autoCorrect={false}
           keyboardType="default"
           maxLength={5}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text.toUpperCase()}
          keyboardAppearance={'dark'}
          onSubmitEditing={() => this.getNewData()}
          blurOnSubmit={true}
          
        />
        <View style={[AppStyles.spacer_30]}></View>
        <View style={[AppStyles.spacer_30]}></View>
        <View style={[AppStyles.spacer_30]}></View>
       <Text style={[AppStyles.h1], {color: '#FF0000'}}>Not a Valid Symbol ;( </Text>
       </View>
       )
    }
    else {
    return (
      <ScrollView style={{flex:1,backgroundColor:'#F5FCFF'}}          
                  contentContainerStyle={{justifyContent:'center',alignItems:'center'}}>
      <View style={[AppStyles.containerCentered]}>
        <TextInput
          ref="1"
          style={{height: 45, borderColor: '#808080', borderWidth: .5, marginTop: 10, padding: 15, backgroundColor: '#FFFFFF',borderRadius: 10}}
          placeholder="Enter Stock Symbol Here"
          returnKeyType="search"
          autoCorrect={false}
          keyboardAppearance={'light'}
          maxLength={5}
          keyboardType="default"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text.toUpperCase()}
          onSubmitEditing={() => this.getNewData()}
          blurOnSubmit={true}/>
        <View>
        <View style={[AppStyles.spacer_30]}></View>
        <Text style={[AppStyles.h4]}>{this.props.getFund.stocks.data.quotes.quote.name}  ({this.props.getFund.stocks.data.quotes.quote.symbol}) </Text>
        <View style={[AppStyles.row]}>
       <TextInput
          ref="5"
          style={{height: 45, borderColor: '#808080', borderWidth: .5, marginTop: 10, padding: 15, width: 185,borderRadius: 10}}
          keyboardType="numeric"
          onChangeText={(font) => this.setState({font})}
          placeholder="Enter Quantity Here"
          returnKeyType="done"
        />
        <View style={[AppStyles.paddingHorizontalSml]}></View>
        <Button
            text={'Buy'}
            onPress={this._delAmount} />
            <View style={[AppStyles.paddingHorizontalSml]}></View>
             <Button
            text={'Sell'}
            onPress={this._changeAmount} />  
        
            </View>
        <View style={[AppStyles.hr]}></View>
        <Text style={[AppStyles.p]}><Text style={{fontSize: 17, color: '#808080', fontStyle: 'italic'}}>Price: </Text>{this.props.getFund.stocks.data.quotes.quote.last} <Text style={{fontSize: 17, color: '#808080', fontStyle: 'italic'}}> Eps: </Text> {this.props.getFund.stocks.data.quotes.quote.eps}</Text>
   	    <View style={[AppStyles.hr]}></View>
        <Text style={[AppStyles.p]}><Text style={{fontSize: 17, color: '#808080', fontStyle: 'italic'}}> High: </Text>{this.props.getFund.stocks.data.quotes.quote.hi} <Text style={{fontSize: 17, color: '#808080', fontStyle: 'italic'}}> Low: </Text> {this.props.getFund.stocks.data.quotes.quote.lo}</Text>
        <View style={[AppStyles.hr]}></View>
        <Text style={[AppStyles.p]}><Text style={{fontSize: 17, color: '#808080', fontStyle: 'italic'}}>Trend:</Text> <Text style={{color: (this.props.getFund.stocks.data.quotes.quote.bidtick === 'd' ? '#FF0000' : '#80FF00')}}> {this.props.getFund.stocks.data.quotes.quote.bidtick === 'd' ? "Down" : "Up"} </Text><Text style={{fontSize: 17, color: '#808080', fontStyle: 'italic'}}> Volume:</Text> {(this.props.getFund.stocks.data.quotes.quote.vl).substring(0,2)} m</Text>
        </View> 

      <Text style={{fontSize: 17, color: '#808080', fontStyle: 'italic'}}> Year Interval: {year} </Text>
        {stockLine}    
     </View>
      </ScrollView>
    )};
  }
}
export default connect(mapStateToProps)(StyleGuide)
