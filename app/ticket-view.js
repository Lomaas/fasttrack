/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import qrcode from './static/qrcode.png';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ListView,
  View
} from 'react-native';

class TicketView extends Component {

  constructor() {
    super();
  }

  _onForward(rowData) {
    this.props.navigator.push({
      title: rowData
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Din billett</Text>
        <Text style={styles.note}>Vis billetten til vakten i døren.</Text>
        <Image
          style={styles.qrcode}
          resizeMode={'cover'}
          source={qrcode}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    marginTop: 50,
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 5,
  },
  note: {
    fontSize: 17,
    fontWeight: '200',
    marginBottom: 25,
    alignSelf: 'center',
    marginRight: 16,
    marginLeft: 16
  },
  qrcode: {
    height: 240,
    width: 300,
    alignSelf: 'center'
  }
});

export default TicketView;
