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
    ListView,
    AsyncStorage,
    RefreshControl,
    TouchableOpacity,
} from 'react-native'
import FormValidation from 'tcomb-form-native'
import { Pie } from 'react-native-pathjs-charts'
import AppStyles from '../styles'
import AppUtil from '../util'
import Button from '../components/button'
import Loading from '../components/loading'
import ProgressBar from '../components/ProgressBar'
import Alerts from '../components/alerts'
import ListRow from '../components/list.row'
import { connect } from 'react-redux'
import axios from 'axios'

//realm
const Realm = require('realm');
const PersonSchema = {
    name: 'Person',
    primaryKey: 'userId',
    properties: {
        userId: 'string',
        name: 'string',
        notifications: { type: 'bool', default: false },
        public: { type: 'bool', default: false },
        pro: { type: 'bool', default: false }
    }
};
const FinanceSchema = {
    name: 'Finance',
    properties: {
        name: 'string',
        amount: 'int'
    }
};
const StockSchema = {
    name: 'Stock',
    properties: {
        cash: 'int',
        stocks: { type: 'list', objectType: 'Finance' }
    }
};

const realm2 = new Realm({ schema: [FinanceSchema, StockSchema, PersonSchema] });
const stock = realm2.objects('Stock');
let stockList = stock[0].stocks;


function mapStateToProps(state) {
    return { trade: state.tradeReducer };
}

class Portfolio extends Component {
    static componentName = 'Portfolio';
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(stockList),
            golf: true,
            hidden: false,
            refreshing: false,
            securities: 0,
        };
    }
    componentWillMount = () => {
        var that = this;
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        var newArr = [];
        let price = 0;

        function getPrice(arr) {
            console.log(arr);
            var obj = {};
            for(var i = 0, j = arr.length; i < j; i++) {
                obj[arr[i].name] = (obj[arr[i].name] || 0) + Number(arr[i].amount);
            }
            var length = Object.keys(obj).length;
            console.log(obj);
            for(var i = 0; i < Object.keys(obj).length; i++) {
                search(i);
            }

            function search(thing) {
                var eachStockName = Object.keys(obj)[thing];
                var eachQuantity = obj[Object.keys(obj)[thing]];
                axios.get('https://yorview.herokuapp.com/api/fundamentals/' + eachStockName).then(function(data) {
                    newArr.push([data.data.data.quotes.quote.symbol, data.data.data.quotes.quote.last * eachQuantity, Number(arr[thing].amount)]);
                    if((data.data.data.quotes.quote.last * eachQuantity) > 1) {
                        price += data.data.data.quotes.quote.last * eachQuantity;
                    }
                    if(newArr.length === length) {
                        console.log("Final: " + price);
                        //console.log(newArr);
                        that.setState({ dataSource: ds.cloneWithRows(newArr), securities: price, golf: false, refreshing: false });
                    }
                });


            }
        }
        getPrice(stockList);

    }
    _onRefresh() {
        var that = this;
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        var newArr = [];
        let price = 0;

        function getPrice(arr) {
            console.log(arr);
            var obj = {};
            for(var i = 0, j = arr.length; i < j; i++) {
                obj[arr[i].name] = (obj[arr[i].name] || 0) + Number(arr[i].amount);
            }
            var length = Object.keys(obj).length;
            console.log(obj);
            for(var i = 0; i < Object.keys(obj).length; i++) {
                search(i);
            }

            function search(thing) {
                var eachStockName = Object.keys(obj)[thing];
                var eachQuantity = obj[Object.keys(obj)[thing]];
                axios.get('https://yorview.herokuapp.com/api/fundamentals/' + eachStockName).then(function(data) {
                    newArr.push([data.data.data.quotes.quote.symbol, data.data.data.quotes.quote.last * eachQuantity]);
                    if((data.data.data.quotes.quote.last * eachQuantity) > 1) {
                        price += data.data.data.quotes.quote.last * eachQuantity;
                    }

                    if(newArr.length === length) {
                        console.log("Final: " + price);
                        that.setState({ dataSource: ds.cloneWithRows(newArr), securities: price, golf: false, refreshing: false });
                    }
                });


            }
        }
        getPrice(stockList);
    }

    render = () => {

        if(this.state.golf) {
            return(
                <Loading text={'Computing Recent Portfolio'} />)
        } else {

            let options = {
                margin: {
                    top: 30,
                    left: 60,
                    right: 0
                },
                width: 350,
                height: 350,
                color: '#2980B9',
                r: 90,
                R: 130,
                legendPosition: 'topCenter',
                animate: {
                    type: 'oneByOne',
                    duration: 500,
                    fillTransition: 5
                },
                label: {
                    fontFamily: 'Arial',
                    fontSize: 18,
                    fontWeight: false,
                    color: '#B3B3B3'
                }
            }
            return(


                <View style = {[AppStyles.container]}>

        <Pie data={[ 
              { name: 'Cash', value: this.props.trade }, 
              { name: 'Securities', value: this.state.securities} 
            ]}
          options={options}
          accessorKey="value"
          margin={{top: 20, left: 60}}
          color="#2980B9"
          pallete={
            [
              {'r':0,'g':128,'b':0},
              {'r':100,'g':149,'b':237},
            ]
          }
          r={60}
          R={160}
          legendPosition="topCenter"
          label={{
            fontFamily: 'Arial',
            fontSize: 15,
            fontWeight: true,
            color: '#FFFFFF'
          }}
          />

                <ProgressBar text={"Profit"} color={"#008000"}  value={Number(59)} value2={parseFloat(this.state.securities)/(parseFloat(this.props.trade))}/>
                <ProgressBar text={"Securities"} color={"#FF8000"} value2={Number(this.state.securities)} value={Number(190)} />
                <ProgressBar text={"Cash"} color={"#4099FF"} value2={this.props.trade} value={Number(this.props.trade)/1000}/>     
                 <View>

      </View>
                </View>)
        }
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
export default connect(mapStateToProps)(Portfolio)
