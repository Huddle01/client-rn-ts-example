/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-get-random-values';
import App from './App';
import {name as appName} from './app.json';
import {registerGlobals} from 'react-native-webrtc';
import './globals.js';

registerGlobals();

AppRegistry.registerComponent(appName, () => App);
