/**
 * Tabs
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';
 
/* Setup ==================================================================== */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  StyleSheet,
  View,
  Text,
  Alert,
  InteractionManager,
} from 'react-native'
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

// Components
import Loading from '../components/loading'
import Button from '../components/button'

//Action(s)
import { trade,incr,decr } from '../actions/trade'

// Screens
import ComingSoon from './soon'
import ListView from './listview'

function mapStateToProps(state) {
  return { trade: state.tradeReducer, incr: state.incr, decr: state.decr };
}

/* Component ==================================================================== */
class Tabs extends Component {
  static componentName = 'Tabs';

  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      loading: true,
      visitedRoutes: [],
      navigation: {
        index: 0,
        routes: [
          { key: '1', title: 'The Game'},
          { key: '2', title: 'The Rules'},
          { key: '3', title: 'Tips'},
          { key: '4', title: 'Results'},
        ],
      },
    };
  }

  /**
    * Executes after all modules have been loaded
    */
  componentDidMount = () => {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: false });
    });
  }

  /**
    * On Change Tab
    */
  _handleChangeTab = (index) => {
    this.setState({
      navigation: { ...this.state.navigation, index },
    });
  }

  _changeAmount = () => {
    this.props.dispatch(incr(10)) 
  }
  _delAmount = () => {
    this.props.dispatch(decr(10))
  }

  /**
    * Header Component
    */
  _renderHeader = (props) => {
    return (
      <TabBarTop {...props} 
        style={styles.tabbar}
        tabStyle={styles.tabbarTab}
        indicatorStyle={styles.tabbarIndicator}
        renderLabel={(scene)=>{
          return (
            <Text style={[styles.tabbar_text]}>{scene.route.title}</Text>
          );
        }} />
    );
  }

  /**
    * Which component to show
    */
  _renderScene = ({ route }) => {
    // For performance, only render if it's this route, or I've visited before
    /*if((this.state.navigation.index + 1) != route.key && this.state.visitedRoutes.indexOf(route.key) < 0) {
      return null;
    }*/
    // And Add this index to visited routes
    if(this.state.visitedRoutes.indexOf(route.key) < 0) this.state.visitedRoutes.push(route.key);

    // Which component should be loaded?
    switch (route.key) {
      case '1':
        return (
        	<View style={AppStyles.containerCentered}>
            <View style={AppStyles.spacer_40}></View>
            <View style={AppStyles.spacer_40}></View>
            <Text style={[AppStyles.h4]}> You have the following imaginary amount in an account: </Text>
            <Text style={{fontSize: 28, color: 'green'}}>Avail. Cash: ${this.props.trade.toFixed(2)}</Text>
            
            <View style={AppStyles.spacer_10}></View>
            <Button
              text={"Upgrade"}
               />
               
            <View style={AppStyles.spacer_30}></View>
            <Text style={[AppStyles.paddingLeft, AppStyles.paddingRight, AppStyles.p]}> You can research, buy, and sell stocks with this money. </Text>
            
          </View>
        );
      case '2':
        return (
        	<View style={AppStyles.containerCentered}>
          <View style={AppStyles.spacer_40}></View>
            <Text style={[AppStyles.h2]}> A Few Rules: </Text>
            <Text style={[AppStyles.p]}> 1. Each trade has an imaginary fee of 0.95 cents.  </Text>
            <Text style={[AppStyles.p]}> 2. If you go "bust", you must wait 2 days for new funds. </Text>
            <Text style={[AppStyles.p]}> 3. Share your insights with others. Knowledge should be shared!</Text>
          </View>
        );
      case '3':
        return (
        	<View style={AppStyles.windowSize}>
            <ComingSoon
            	placeholder={'This is ' + route.title}
              navigator={this.props.navigator} />
          </View>
        );
      case '4':
        return (
        	<View style={AppStyles.windowSize}>
            <ListView
              navigator={this.props.navigator} />
          </View>
        );
      default:
        return null;
    }
  }

  /**
    * Do Render
    */
  render = () => {
    if (this.state.loading) return <Loading />

    return (
      <TabViewAnimated
        style={[styles.tabContainer]}
        navigationState={this.state.navigation}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
	// Tab Styles
  tabContainer: {
    flex: 1,
  },
	tabbar: {
		backgroundColor: AppConfig.primaryColor,
	},
	tabbarIndicator: {
		backgroundColor: AppConfig.secondaryColor,
	},
	tabbar_text: {
		color: "#FFF",
	},
});

/* Export Component ==================================================================== */
export default connect(mapStateToProps)(Tabs)
