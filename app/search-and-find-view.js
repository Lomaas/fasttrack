/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import PayView from './pay-view';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ListView,
  TextInput,
  View
} from 'react-native';

class SearchAndFindView extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      searchText: '',
      dataSource: ds.cloneWithRows([
        { name: 'Sirkus', location: '50m', image: require('./static/baroque.png') },
        { name: 'Nox', location: '80m', image: require('./static/nox.png') },
        { name: 'Skagum', location: '200m', image: require('./static/skagum.png') }
      ]),
    };
  }

  _onForward(rowData) {
    this.props.navigator.push({
      title: rowData.name,
      component: PayView,
      passProps: { ...rowData },
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={{flex: 1, marginTop: 64, backgroundColor: '#000000'}}
          dataSource={this.state.dataSource}
          renderRow={ (rowData) => {
            return (
              <TouchableOpacity onPress={this._onForward.bind(this, rowData)}>
                <View style={styles.row}>
                <Image
                  resizeMode={'cover'}
                  style={styles.imageRow}
                  source={rowData.image} />
                  <Text style={styles.nameRow}>{rowData.name}</Text>
                  <Text style={styles.locationRow}>{rowData.location}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  rowText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  row: {
    borderRadius: 3,
  },
  nameRow: {
    color: '#FFFFFF',
    fontSize: 24,
    position: 'absolute',
    bottom: 17,
    left: 16,
    backgroundColor:'rgba(52,52,52,0)',
  },
  locationRow: {
    color: '#FFFFFF',
    fontSize: 16,
    position: 'absolute',
    bottom: 1,
    left: 16,
    backgroundColor:'rgba(52,52,52,0)',
  },
  imageRow: {
    height: 240
  },
});

export default SearchAndFindView;
