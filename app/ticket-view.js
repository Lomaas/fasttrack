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
  ListView,
  View
} from 'react-native';

class TicketView extends Component {
  static propTypes = {
  }
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
      <View style={styles.container}>
        <Text style={styles.header}>Payment for this.props.paymentFor</Text>
        <Image
          style={styles.qrcode}
          resizeMode={'cover'}
          source={qrcode}/>
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
  header: {
    marginTop: 100,
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
  },
  qrcode: {
    margin:0,
    flex: 1,
    height: 240,
  }
});

export default Ticket;
