import React, { Component } from 'react';
import { NavigatorIOS } from 'react-native';
import SearchAndFindView from './search-and-find-view';

export default class NavigatorIOSApp extends Component {
  _handleNavigationRequest() {
    // Set search view
  }

  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: SearchAndFindView,
          title: 'Select club',
          rightButtonTitle: 'Search',
          onRightButtonPress: () => this._handleNavigationRequest(),
        }}
        style={{flex: 1}}
      />
    )
  }
}
