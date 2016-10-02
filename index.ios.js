/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import NavigatorIOSApp from './app/navigator.js';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Fasttrack extends Component {
  render() {
    return (
      <NavigatorIOSApp/>
    );
  }
}

AppRegistry.registerComponent('Fasttrack', () => Fasttrack);
