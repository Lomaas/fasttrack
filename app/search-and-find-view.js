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
  ListView,
  TextInput,
  View
} from 'react-native';

class SearchAndFindView extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired
  }

  constructor() {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      searchText: '',
      dataSource: ds.cloneWithRows([
        'Sirkus',
        'Nox',
        'Skagum'
      ]),
    };
  }

  _onForward(rowData) {
    this.props.navigator.push({
      title: rowData,
      component: PayView
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40, placeholder:'ff', marginTop: 72, color: '#000000'}}
          onChangeText={(text) => this.setState({searchText: text})}
          value={this.state.searchText}
        />
        <Text style={styles.header}>Utested i nærheten</Text>
        <ListView
          style={{flex: 1}}
          dataSource={this.state.dataSource}
          renderRow={ (rowData) => {
            return (
              <TouchableOpacity onPress={this._onForward.bind(this, rowData)}>
                <Text style={styles.row}> {rowData} </Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    );
  }
}

const renderRow = (rowData) => {
  const postMessage = () => {
    console.log("Didpress render rowww")
    this._onForward();
  }
  return (
    <TouchableOpacity style={{flex: 1}} onPress={postMessage}>
      <Text style={styles.row}> {rowData} </Text>
    </TouchableOpacity>
  );
};

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
    marginTop: 20,
    borderRadius: 3,
    marginLeft: 16,
    marginRight: 16,
    padding:18,
    color: '#FFFFFF',
    fontSize: 20,
    backgroundColor: '#ff0000'
  },
  header: {
    marginTop: 10,
    fontSize: 22,
    textAlign: 'left',
    margin: 16,
  },
});

export default SearchAndFindView;
