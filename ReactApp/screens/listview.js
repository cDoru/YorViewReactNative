import React, {
    Component
} from 'react'
import {
    StyleSheet,
    View,
    ListView,
    Alert,
    RefreshControl,
    Text,
} from 'react-native'
import AppStyles from '../styles'
import AppConfig from '../config'
import AppUtil from '../util'
import Loading from '../components/loading'
import ListRow from '../components/list.row'
import Screen from './soon'
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
class ListViewExample extends Component {
    static componentName = 'ListViewExample';
    constructor(props) {
        super(props);


        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(stockList),
            golf: true,
            refreshing: false,
        };
    }
    static propTypes = {
        navigator: React.PropTypes.object.isRequired,
    }
    componentWillMount = () => {
        var that = this;
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        var newArr = [];

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

                    if(newArr.length === length) {
                        console.log(newArr);
                        that.setState({ dataSource: ds.cloneWithRows(newArr), golf: false, refreshing: false });
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
                    console.log(data.data.data.quotes.quote)
                    if(newArr.length === length) {
                        console.log(newArr);
                        that.setState({ dataSource: ds.cloneWithRows(newArr), golf: false });
                    }
                });


            }
        }
        getPrice(stockList);
    }
    render = () => {
        if (this.state.golf) {
        return(
            <Loading text={'Computing Recent Portfolio'} />)}
        else {
            return(
                <View style = {[AppStyles.container]}>
           <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }       
        renderRow={(data) => <View style={[AppStyles.container], {marginLeft: 30, marginTop: 8}}><Text style={[AppStyles.marginLeft]}>{(data[0]).toString().toUpperCase()}: ({data[2]} Shares)</Text><View style={[AppStyles.row]}><Text style={parseFloat(data[1]).toFixed(2) < 1 ? [AppStyles.h4R] : [AppStyles.h4G]}>{parseFloat(data[1]).toFixed(2) < 1 ? "Recently Sold" : parseFloat(data[1]).toFixed(2)}</Text></View><View style={styles.separator}></View></View>}
      />
          </View>
            )
        }
    }
}
/* Styles ==================================================================== */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    separator: {
        flex: 1,
        height: 1,
        width: AppConfig.windowWidth - 10,
        backgroundColor: '#E6E6E6',
    },
});

export default ListViewExample;
