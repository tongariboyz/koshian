import React from 'react-native';
import {Provider} from 'react-redux/native';
import App from './App';


export default class Root extends React.Component {
  render() {
    return (
      <Provider>
        {() => <App />}
      </Provider>
    );
  }
}
