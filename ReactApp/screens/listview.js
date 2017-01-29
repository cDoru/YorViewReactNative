import React, {
    Component
} from 'react'
import {
    StyleSheet,
    View,
    ListView,
    Text,
} from 'react-native'
import AppStyles from '../styles'
import AppConfig from '../config'
import AppUtil from '../util'
import ListRow from '../components/list.row'
import Screen from './soon'
import axios from 'axios'

//realm
const Realm = require('realm');
const PersonSchema = {
  name: 'Person',
  primaryKey: 'userId',
  properties: {
    userId:  'string',
    name: 'string',
    notifications: {type: 'bool', default: false},
    public: {type: 'bool', default: false},
    pro: {type: 'bool', default: false}
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
      stocks: {type: 'list', objectType: 'Finance'}
  }
};

const realm2 = new Realm({schema: [FinanceSchema, StockSchema, PersonSchema]});
const stock = realm2.objects('Stock');
let stockList = stock[0].stocks;
class ListViewExample extends Component {
    static componentName = 'ListViewExample';
    constructor(props) {
      super(props);
        
     
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});       
        this.state = {
          dataSource: ds.cloneWithRows(stockList),
          golf: true,
    };
    }
    static propTypes = {
        navigator: React.PropTypes.object.isRequired,
    }
    componentWillMount= () => { 
      var that = this;
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      var newArr = [];
      function getPrice(arr) {
        console.log(arr);
    var obj = {};
    for (var i = 0, j = arr.length; i < j; i++) {
        obj[arr[i].name] = (obj[arr[i].name] || 0) + Number(arr[i].amount);
    }
    var length = Object.keys(obj).length;
    console.log(obj);
    for (var i = 0; i < Object.keys(obj).length; i++) {
        search(i);
    }
    function search(thing) {
        var eachStockName = Object.keys(obj)[thing];
        var eachQuantity = obj[Object.keys(obj)[thing]];
        axios.get('https://yorview.herokuapp.com/api/fundamentals/' + eachStockName).then(function(data) {
            newArr.push([data.data.data.quotes.quote.symbol, data.data.data.quotes.quote.last * eachQuantity]);
            console.log(data.data.data.quotes.quote)   
        if (newArr.length === length) {
          console.log(newArr);
            that.setState({dataSource: ds.cloneWithRows(newArr), golf: false});
        }
        });


    }  
}
getPrice(stockList);
 
}
    render = () => {

        return ( 
          <View style = {[AppStyles.container]}>
           <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        
        renderRow={(data) => <View style={[AppStyles.containerCentered]}><Text style={[AppStyles.marginLeft]}>{this.state.golf === true ? (data.name).toString().toLowerCase() :  (data[0]).toString().toUpperCase()}</Text><Text style={[AppStyles.h4R]}>{this.state.golf === true ? data.amount : parseFloat(data[1]).toFixed(2)}</Text><View style={styles.separator}></View></View>}
      />
          </View>);
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
    width: AppConfig.windowWidth-10,
    backgroundColor: '#E6E6E6',
  },
});

export default ListViewExample;