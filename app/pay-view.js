/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import TicketView from './ticket-view';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ActivityIndicator,
  Modal,
  ScrollView,
  TouchableOpacity,
  ListView,
  View
} from 'react-native';

class PayView extends Component {

  constructor() {
    super();
    this.state = {
      processingPayment: false,
      modalVisible: false
    }
  }

  _onForward(rowData) {
    this.props.navigator.push({
      title: rowData,
      component: TicketView,
      passProps: { name: this.props.name,  },
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  _onRequestCloseTickeyView() {
    this.setModalVisible(false);
  }

  _payWithCard() {
    this.setState({ processingPayment: true });
    setTimeout(() => {
      // this._onForward('Bekreftelse');
      this.setModalVisible();
    }, 1000);
  }

  render() {
    console.log('processingPayment', this.props);
    const scrollViewStyles = [styles.container];
    if (this.state.processingPayment) {
      scrollViewStyles.push({ backgroundColor: "#ff00ff00" });
    }

    return (
      <ScrollView style={scrollViewStyles}>
        <Text style={styles.header}>Payment for { this.props.name }</Text>
        <View style={styles.row}>
          <Text style={[styles.rowTextLeftLabel, styles.rowTextKursiv]}>Fasttrack for { this.props.name }</Text>
          <Text style={[  styles.rowTextRightLabel, styles.rowTextKursiv]}>2 x 250,-</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowTextLeftLabel}>Total</Text>
          <Text style={styles.rowTextRightLabel}>kr 500,-</Text>
        </View>
        { !this.state.processingPayment &&
          <View>
            <TouchableOpacity onPress={this._payWithCard.bind(this)}>
              <Text style={[styles.payButton, styles.payButtonVipps]}>Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.note}>Change payment method? Click here</Text>
            </TouchableOpacity>
          </View>
        }
        { this.state.processingPayment &&
          <ActivityIndicator
            animating={ this.state.processingPayment }
            style={[styles.centering, { height: 80 }]}
            size="large"
            />
        }
        {
          <Modal
             animationType={"slide"}
             transparent={false}
             visible={this.state.modalVisible}
             onRequestClose={this._onRequestCloseTickeyView.bind(this)}>
             <TicketView closeView={this.setModalVisible.bind(this, false)}/>
          </Modal>
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  payButton: {
    flex: 1,
    marginTop: 20,
    borderRadius: 3,
    marginLeft: 16,
    marginRight: 16,
    padding: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#ffc100'
  },
  payButtonVipps: {
    backgroundColor: '#009090'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 16,
    marginRight: 16
  },
  rowTextLeftLabel: {
    fontSize: 20,
    textAlign: 'left',
    flex: 1,
  },
  rowTextRightLabel: {
    fontSize: 20,
    flex: 1,
    textAlign: 'right',
  },
  rowTextKursiv: {
    fontWeight: '200'
  },
  header: {
    marginTop: 30,
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
  },
  note: {
    fontSize: 15,
    fontWeight: '200',
    marginTop: 35,
    alignSelf: 'center',
    marginRight: 16,
    marginLeft: 16
  },
});

export default PayView;
