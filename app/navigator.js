import React, { Component } from 'react';
import { NavigatorIOS } from 'react-native';
import SearchAndFindView from './search-and-find-view';
export default class NavigatorIOSApp extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: SearchAndFindView,
          title: 'Select club',
        }}
        style={{flex: 1}}
      />
    )
  }
}
