import React from 'react-native';
import {Provider} from 'react-redux/native';
import configureStore from '../stores/configureStore';
import App from './App';

const store = configureStore();


export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    );
  }
}
