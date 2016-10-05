/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import qrcode from './static/qrcode.png';
import closeButton from './static/close-button.png';
import PayView from './pay-view';
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

  componentDidMount() { }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <Text style={styles.header}>Your ticket</Text>
          <Text style={styles.note}>Show the ticket to the guard at the entrance.</Text>
          <Image
            style={styles.qrcode}
            resizeMode={'cover'}
            source={qrcode}/>
        </ScrollView>
        <TouchableOpacity onPress={this.props.closeView}>
          <Text style={styles.closeButton}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  closeButton: {
    marginBottom: 35,
    fontSize: 22,
    fontWeight: '300',
    textAlign: 'center',
  },
  header: {
    marginTop: 72,
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
