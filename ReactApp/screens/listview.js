/**
 * Listing SCREEN
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';
/* Setup ==================================================================== */
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



class ListViewExample extends Component {

    static componentName = 'ListViewExample';
    constructor(props) {
      const realm2 = new Realm({schema: [FinanceSchema, StockSchema, PersonSchema]});
const stock = realm2.objects('Stock');
const stockList = stock[0].stocks;
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        super(props);
        this.state = {

      dataSource: ds.cloneWithRows(stockList),
    };
    }
    static propTypes = {
        navigator: React.PropTypes.object.isRequired,
    }
    render = () => {
        return ( 
          <View style = {[AppStyles.container]}>
           <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data) => <View style={[AppStyles.containerCentered]}><Text style={[AppStyles.p]}>{data.name}: {data.amount}</Text></View>}
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
});
/* Export Component ==================================================================== */
export default ListViewExample






