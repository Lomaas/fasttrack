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
  ScrollView,
  TouchableOpacity,
  ListView,
  View
} from 'react-native';

class PayView extends Component {
  static propTypes = {
    paymentFor: PropTypes.string.isRequired
  }

  constructor() {
    super();
    this.state = {
      processingPayment: false
    }
  }

  _onForward(rowData) {
    this.props.navigator.push({
      title: rowData,
      component: TicketView
    });
  }

  _payWithCard() {
    this.setState({ processingPayment: true });
    setTimeout(() => {
      this._onForward('Bekreftelse');
    }, 1000);
  }

  render() {
    console.log('processingPayment');
    const scrollViewStyles = [styles.container];
    if (this.state.processingPayment) {
      scrollViewStyles.push({ backgroundColor: "#ff00ff00" });
    }

    return (
      <ScrollView style={scrollViewStyles}>
        <Text style={styles.header}>Payment for Sirkus </Text>
        <View style={styles.row}>
          <Text style={[styles.rowTextLeftLabel, styles.rowTextKursiv]}>Product</Text>
          <Text style={[  styles.rowTextRightLabel, styles.rowTextKursiv]}>Fasttrack for Sirkus</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowTextLeftLabel}>Total</Text>
          <Text style={styles.rowTextRightLabel}>kr 250,-</Text>
        </View>
        { !this.state.processingPayment &&
          <View>
            <TouchableOpacity onPress={this._payWithCard.bind(this)}>
              <Text style={styles.payButton}>Betal med kort</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._payWithCard.bind(this)}>
              <Text style={[styles.payButton, styles.payButtonVipps]}>Betal med Vipps</Text>
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
    fontWeight: '300'
  },
  header: {
    marginTop: 30,
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
  },
});

export default PayView;
