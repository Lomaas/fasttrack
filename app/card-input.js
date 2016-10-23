import React, { Component, PropTypes } from 'react';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import PayView from './pay-view';
import {
  AppRegistry,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
  ListView,
  TextInput,
  WebView,
  View
} from 'react-native';
import stripe from './stripe-wrapper';

const payUrl = 'https://fasttrack-stripe.azurewebsites.net/api/HttpTriggerNodeJS1?code=lrkz73bfkbsinjiwmk3a98uxrmrrovlzmfq57uhlrkoz1qyqfrjw94nvri8w6csn8nfyg1a714i';

const log = (obj) => {
  console.log(obj);
  return obj;
}
export default class CardInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonDisabled: true,
      card: {},
      processingPayment: false
    }
  }

  _onChange(result) {
    console.log(result);

    if (result.valid) {
      this.setState({ buttonDisabled: false, card: { ...result.values } });
    }
    if (!this.state.buttonDisabled) {
        this.setState({ buttonDisabled: true });
    }
  }

  _submitCard() {
    console.log(this.state.card);
    this.setState({ processingPayment: true });

    const { card } = this.state;
    const number = card.number.split(' ').join('');
    const expiry = card.expiry.split('/');
    const month = expiry[0];
    const year = expiry[1];

    stripe.createCardToken(number, month, year, card.cvc)
      .then(res => res.json())
      .then(json => {
        //TODO: Get token and make Payment
        console.log(json);
        console.log(json.id); //Token

        fetch(payUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            stripeToken: json.id
          })
        }).then(log).catch(log);
      });




    //this.props.navigator.pop();
  }

  render() {
    var html = require('./static/card-input.html');
    console.log(html)
    const { buttonDisabled, processingPayment } = this.state;
    const buttonText = buttonDisabled ? 'Enter card information...' : 'Pay with this card';
    return (
      // <WebView
      //   //source={{html: html, baseUrl: 'https://fasttrack-stripe.azurewebsites.net'}}
      //   source={require('./static/card-input.html')}
      //   style={{marginTop: 20}}
      // />

      <View style={styles.container}>
        <View style={{flex: 0, backgroundColor: "#F5F5F5"}}>
          <LiteCreditCardInput
            autoFocus
            inputStyle={styles.input}
            validColor={"black"}
            invalidColor={"red"}
            placeholderColor={"darkgray"}
            onChange={this._onChange.bind(this)} />
        </View>
        {
          !processingPayment &&
          <TouchableOpacity style={styles.button} disabled={buttonDisabled} onPress={this._submitCard.bind(this)}>
            <Text style={[styles.buttonText, buttonDisabled ? styles.buttonTextDisabled : {}]}>{buttonText}</Text>
          </TouchableOpacity>
        }
        {
          processingPayment &&
          <ActivityIndicator
            animating
            style={{ height: 80, marginTop: 40, }}
            size="large"
            />
        }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "#F5F5F5",
    backgroundColor: "#FFFFFF",
    marginTop: 120,
    flex: 1,
    flexDirection: 'column',
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
  buttonText: {
    flex: 1,
    marginTop: 40,
    borderRadius: 3,
    marginLeft: 16,
    marginRight: 16,
    padding: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#ffc100'
  },
  buttonTextDisabled: {
    backgroundColor: '#F5F5F5',
    color: 'gray'
  }
});
