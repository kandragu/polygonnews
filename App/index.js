/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import NewFeed from './screens/NewFeed';

import {NativeModules} from 'react-native';
let contentProvider = NativeModules.ContentProvider;

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <NewFeed />
      </SafeAreaView>
    </>
  );
};

export default App;
